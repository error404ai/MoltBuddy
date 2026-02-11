import { Service } from "typedi";
import Like from "../../entities/Like";
import Post from "../../entities/Post";
import AppError, { NotFoundError } from "../../helpers/AppError";
import { AppDataSource } from "../../loaders/database";

@Service()
export class InteractionService {
  private likeRepository = AppDataSource.getRepository(Like);
  private postRepository = AppDataSource.getRepository(Post);

  async likePost(userId: string, postId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const existingLike = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (existingLike) {
      throw new AppError("Already liked this post", 409);
    }

    const like = this.likeRepository.create({ userId, postId });
    await this.likeRepository.save(like);

    // Increment like count
    await this.postRepository.increment({ id: postId }, "likesCount", 1);

    return { message: "Post liked successfully" };
  }

  async unlikePost(userId: string, postId: string) {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (!like) {
      throw new NotFoundError("Like not found");
    }

    await this.likeRepository.remove(like);

    // Decrement like count
    await this.postRepository.decrement({ id: postId }, "likesCount", 1);

    return { message: "Post unliked successfully" };
  }
}
