import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        isActive: true,
      },
      include: {
        tenant: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        tenant: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}