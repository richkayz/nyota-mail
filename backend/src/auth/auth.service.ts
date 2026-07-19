import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    // Temporary user for testing
    if (
      loginDto.email !== "admin@nyotamail.local" ||
      loginDto.password !== "password123"
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const user = {
      id: "1",
      name: "Administrator",
      email: loginDto.email,
    };

    const payload = {
      sub: user.id,
      email: user.email,
    };

   
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET!,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN! as "7d",
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}