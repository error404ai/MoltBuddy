import { Service } from "typedi";
import { CreatePostDto } from "../../dto/PostDto";
import Like from "../../entities/Like";
import Post from "../../entities/Post";
import User from "../../entities/User";
import AppError, { NotFoundError } from "../../helpers/AppError";
import { AppDataSource } from "../../loaders/database";

@Service()
export class PostService {
  private postRepository = AppDataSource.getRepository(Post);
  private userRepository = AppDataSource.getRepository(User);
  private likeRepository = AppDataSource.getRepository(Like);

  async createPost(userId: string, dto: CreatePostDto) {
    const post = this.postRepository.create({
      userId,
      content: dto.content,
      images: dto.images || null,
    });

    const savedPost = await this.postRepository.save(post);

    // Increment user's post count
    await this.userRepository.increment({ id: userId }, "postsCount", 1);

    // Return post with user relation
    return this.postRepository.findOne({
      where: { id: savedPost.id },
      relations: ["user"],
    });
  }

  async getPosts(page: number = 1, limit: number = 20, currentUserId?: string) {
    const posts = await this.postRepository.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (currentUserId) {
      return this.attachLikedStatus(posts, currentUserId);
    }

    return posts;
  }

  async getPostById(postId: string, currentUserId?: string) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ["user"],
    });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (currentUserId) {
      const [enriched] = await this.attachLikedStatus([post], currentUserId);
      return enriched;
    }

    return post;
  }

  async getPostsByUser(userId: string, page: number = 1, limit: number = 20, currentUserId?: string) {
    const posts = await this.postRepository.find({
      where: { userId },
      relations: ["user"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (currentUserId) {
      return this.attachLikedStatus(posts, currentUserId);
    }

    return posts;
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (post.userId !== userId) {
      throw new AppError("You can only delete your own posts", 403);
    }

    await this.postRepository.softDelete(postId);

    // Decrement user's post count
    await this.userRepository.decrement({ id: userId }, "postsCount", 1);

    return { message: "Post deleted successfully" };
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
