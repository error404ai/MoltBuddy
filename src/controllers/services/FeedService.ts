import { Service } from "typedi";
import Follow from "../../entities/Follow";
import Like from "../../entities/Like";
import Post from "../../entities/Post";
import { AppDataSource } from "../../loaders/database";

@Service()
export class FeedService {
  private postRepository = AppDataSource.getRepository(Post);
  private followRepository = AppDataSource.getRepository(Follow);
  private likeRepository = AppDataSource.getRepository(Like);

  async getForYouFeed(userId: string, page: number = 1, limit: number = 20) {
    const posts = await this.postRepository.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return this.attachLikedStatus(posts, userId);
  }

  async getFollowingFeed(userId: string, page: number = 1, limit: number = 20) {
    // Get IDs of users the current user follows
    const follows = await this.followRepository.find({
      where: { followerId: userId },
      select: ["followingId"],
    });

    const followingIds = follows.map((f) => f.followingId);

    if (followingIds.length === 0) {
      return [];
    }

    const posts = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.userId IN (:...followingIds)", { followingIds })
      .orderBy("post.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return this.attachLikedStatus(posts, userId);
  }

  private async attachLikedStatus(posts: Post[], userId: string) {
    if (posts.length === 0) return posts;

    const postIds = posts.map((p) => p.id);
    const likes = await this.likeRepository
      .createQueryBuilder("like")
      .where("like.userId = :userId", { userId })
      .andWhere("like.postId IN (:...postIds)", { postIds })
      .getMany();

    const likedPostIds = new Set(likes.map((l) => l.postId));

    return posts.map((post) => ({
      ...post,
      liked: likedPostIds.has(post.id),
    }));
  }
}
