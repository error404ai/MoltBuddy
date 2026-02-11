import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

export interface JwtPayload {
  userId: string;
  email: string;
  handle: string;
  type: string;
}

@Service()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly saltRounds: number;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "moltbuddy-secret-change-me";
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
    this.saltRounds = 12;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    } as jwt.SignOptions);
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.jwtSecret) as JwtPayload;
  }
}
