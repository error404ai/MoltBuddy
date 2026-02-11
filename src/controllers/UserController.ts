import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, Put, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { LoginDto, RegisterDto, UpdateProfileDto } from "../dto/UserDto";
import type { JwtPayload } from "../services/AuthService";
import { UserService } from "./services/UserService";

@JsonController("/users")
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/register")
  async register(@Body() body: RegisterDto) {
    const result = await this.userService.register(body);
    return { status: "success", data: result };
  }

  @Post("/login")
  async login(@Body() body: LoginDto) {
    const result = await this.userService.login(body);
    return { status: "success", data: result };
  }

  @Get("/")
  @Authorized()
  async getUsers(@QueryParam("page") page: number = 1, @QueryParam("limit") limit: number = 20) {
    const result = await this.userService.getUsers(page, limit);
    return { status: "success", data: result };
  }

  @Get("/me")
  @Authorized()
  async getMe(@CurrentUser() currentUser: JwtPayload) {
    const user = await this.userService.getProfile(currentUser.userId);
    return { status: "success", data: user };
  }

  @Get("/handle/:handle")
  @Authorized()
  async getProfileByHandle(@Param("handle") handle: string) {
    const user = await this.userService.getProfileByHandle(handle);
    return { status: "success", data: user };
  }

  @Get("/:id")
  @Authorized()
  async getProfile(@Param("id") id: string) {
    const user = await this.userService.getProfile(id);
    return { status: "success", data: user };
  }

  @Put("/me")
  @Authorized()
  async updateProfile(@CurrentUser() currentUser: JwtPayload, @Body() body: UpdateProfileDto) {
    const user = await this.userService.updateProfile(currentUser.userId, body);
    return { status: "success", data: user };
  }
}
