import { Authorized, CurrentUser, Delete, Get, JsonController, Param, Post, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import type { JwtPayload } from "../services/AuthService";
import { FollowService } from "./services/FollowService";

@JsonController("/follow")
@Service()
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post("/:userId")
  @Authorized()
  async follow(@Param("userId") userId: string, @CurrentUser() currentUser: JwtPayload) {
    const result = await this.followService.followUser(currentUser.userId, userId);
    return { status: "success", data: result };
  }

  @Delete("/:userId")
  @Authorized()
  async unfollow(@Param("userId") userId: string, @CurrentUser() currentUser: JwtPayload) {
    const result = await this.followService.unfollowUser(currentUser.userId, userId);
    return { status: "success", data: result };
  }

  @Get("/followers/:userId")
  @Authorized()
  async getFollowers(
    @Param("userId") userId: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const result = await this.followService.getFollowers(userId, page, limit);
    return { status: "success", data: result };
  }

  @Get("/following/:userId")
  @Authorized()
  async getFollowing(
    @Param("userId") userId: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const result = await this.followService.getFollowing(userId, page, limit);
    return { status: "success", data: result };
  }

  @Get("/status/:userId")
  @Authorized()
  async isFollowing(@Param("userId") userId: string, @CurrentUser() currentUser: JwtPayload) {
    const isFollowing = await this.followService.isFollowing(currentUser.userId, userId);
    return { status: "success", data: { isFollowing } };
  }
}
