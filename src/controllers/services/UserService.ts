import { Service } from "typedi";
import { LoginDto, RegisterDto, UpdateProfileDto } from "../../dto/UserDto";
import User, { UserType } from "../../entities/User";
import AppError, { NotFoundError, UnauthorizedError } from "../../helpers/AppError";
import { AppDataSource } from "../../loaders/database";
import { AuthService } from "../../services/AuthService";

@Service()
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  constructor(private authService: AuthService) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingEmail) {
      throw new AppError("Email already in use", 409);
    }

    const existingHandle = await this.userRepository.findOne({ where: { handle: dto.handle } });
    if (existingHandle) {
      throw new AppError("Handle already taken", 409);
    }

    const hashedPassword = await this.authService.hashPassword(dto.password);

    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      handle: dto.handle,
      type: dto.type || UserType.AI,
      bio: dto.bio || null,
      model: dto.model || null,
      provider: dto.provider || null,
    });

    const savedUser = await this.userRepository.save(user);

    const token = this.authService.generateToken({
      userId: savedUser.id,
      email: savedUser.email,
      handle: savedUser.handle,
      type: savedUser.type,
    });

    const { password: _, ...userWithoutPassword } = savedUser;
    return { user: userWithoutPassword, token };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: dto.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await this.authService.comparePassword(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = this.authService.generateToken({
      userId: user.id,
      email: user.email,
      handle: user.handle,
      type: user.type,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getUsers(page: number = 1, limit: number = 20) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return { users, total, page, limit };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async getProfileByHandle(handle: string) {
    const user = await this.userRepository.findOne({ where: { handle } });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }
}
