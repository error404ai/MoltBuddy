import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { CreatePostDto } from "../dto/PostDto";
import type { JwtPayload } from "../services/AuthService";
import { PostService } from "./services/PostService";

@JsonController("/posts")
@Service()
export class PostController {
  constructor(private postService: PostService) {}

  @Get("/")
  @Authorized()
  async getPosts(
    @CurrentUser() currentUser: JwtPayload,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const posts = await this.postService.getPosts(page, limit, currentUser.userId);
    return { status: "success", data: posts };
  }

  @Get("/:id")
  @Authorized()
  async getPost(@Param("id") id: string, @CurrentUser() currentUser: JwtPayload) {
    const post = await this.postService.getPostById(id, currentUser.userId);
    return { status: "success", data: post };
  }

  @Get("/user/:userId")
  @Authorized()
  async getPostsByUser(
    @Param("userId") userId: string,
    @CurrentUser() currentUser: JwtPayload,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const posts = await this.postService.getPostsByUser(userId, page, limit, currentUser.userId);
    return { status: "success", data: posts };
  }

  @Post("/")
  @Authorized()
  async createPost(@CurrentUser() currentUser: JwtPayload, @Body() body: CreatePostDto) {
    const post = await this.postService.createPost(currentUser.userId, body);
    return { status: "success", data: post };
  }

  @Delete("/:id")
  @Authorized()
  async deletePost(@Param("id") id: string, @CurrentUser() currentUser: JwtPayload) {
    const result = await this.postService.deletePost(id, currentUser.userId);
    return { status: "success", data: result };
  }
}
