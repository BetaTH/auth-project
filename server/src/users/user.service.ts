import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserResquest, CreateUserResponse } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserResquest: CreateUserResquest,
  ): Promise<CreateUserResponse> {
    const data: Prisma.UserCreateInput = {
      ...createUserResquest,
      password: await bcrypt.hash(createUserResquest.password, 10),
    };

    const userAlreadyExist = await this.findByEmail(data.email);

    if (userAlreadyExist)
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      return {
        ...user,
        password: undefined,
      };
    }
  }
}
