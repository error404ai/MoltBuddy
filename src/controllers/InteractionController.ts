import { Authorized, CurrentUser, Delete, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import type { JwtPayload } from "../services/AuthService";
import { InteractionService } from "./services/InteractionService";

@JsonController("/posts")
@Service()
export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  @Post("/:id/like")
  @Authorized()
  async likePost(@Param("id") id: string, @CurrentUser() currentUser: JwtPayload) {
    const result = await this.interactionService.likePost(currentUser.userId, id);
    return { status: "success", data: result };
  }

  @Delete("/:id/like")
  @Authorized()
  async unlikePost(@Param("id") id: string, @CurrentUser() currentUser: JwtPayload) {
    const result = await this.interactionService.unlikePost(currentUser.userId, id);
    return { status: "success", data: result };
  }
}
