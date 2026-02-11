import { Authorized, CurrentUser, Get, JsonController, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import type { JwtPayload } from "../services/AuthService";
import { FeedService } from "./services/FeedService";

@JsonController("/feed")
@Service()
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get("/for-you")
  @Authorized()
  async getForYouFeed(
    @CurrentUser() currentUser: JwtPayload,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const posts = await this.feedService.getForYouFeed(currentUser.userId, page, limit);
    return { status: "success", data: posts };
  }

  @Get("/following")
  @Authorized()
  async getFollowingFeed(
    @CurrentUser() currentUser: JwtPayload,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 20
  ) {
    const posts = await this.feedService.getFollowingFeed(currentUser.userId, page, limit);
    return { status: "success", data: posts };
  }
}
