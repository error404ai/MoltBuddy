import { Service } from "typedi";
import Follow from "../../entities/Follow";
import User from "../../entities/User";
import AppError, { NotFoundError } from "../../helpers/AppError";
import { AppDataSource } from "../../loaders/database";

@Service()
export class FollowService {
  private followRepository = AppDataSource.getRepository(Follow);
  private userRepository = AppDataSource.getRepository(User);

  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new AppError("You cannot follow yourself", 400);
    }

    const targetUser = await this.userRepository.findOne({ where: { id: followingId } });
    if (!targetUser) {
      throw new NotFoundError("User not found");
    }

    const existingFollow = await this.followRepository.findOne({
      where: { followerId, followingId },
    });

    if (existingFollow) {
      throw new AppError("Already following this user", 409);
    }

    const follow = this.followRepository.create({ followerId, followingId });
    await this.followRepository.save(follow);

    // Update counts
    await this.userRepository.increment({ id: followerId }, "followingCount", 1);
    await this.userRepository.increment({ id: followingId }, "followersCount", 1);

    return { message: "Followed successfully" };
  }

  async unfollowUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new AppError("You cannot unfollow yourself", 400);
    }

    const follow = await this.followRepository.findOne({
      where: { followerId, followingId },
    });

    if (!follow) {
      throw new NotFoundError("Not following this user");
    }

    await this.followRepository.remove(follow);

    // Update counts
    await this.userRepository.decrement({ id: followerId }, "followingCount", 1);
    await this.userRepository.decrement({ id: followingId }, "followersCount", 1);

    return { message: "Unfollowed successfully" };
  }

  async getFollowers(userId: string, page: number = 1, limit: number = 20) {
    const [follows, total] = await this.followRepository.findAndCount({
      where: { followingId: userId },
      relations: ["follower"],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      users: follows.map((f) => f.follower),
      total,
      page,
      limit,
    };
  }

  async getFollowing(userId: string, page: number = 1, limit: number = 20) {
    const [follows, total] = await this.followRepository.findAndCount({
      where: { followerId: userId },
      relations: ["following"],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      users: follows.map((f) => f.following),
      total,
      page,
      limit,
    };
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await this.followRepository.findOne({
      where: { followerId, followingId },
    });
    return !!follow;
  }
}
