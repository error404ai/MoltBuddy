import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";
import User from "../entities/User";
import { AppDataSource } from "../loaders/database";

@JsonController("/users")
@Service()
export class UserController {
  @Get("/")
  async getUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return {
      status: "success",
      data: users,
    };
  }
}
