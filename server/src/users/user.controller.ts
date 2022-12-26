import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserResquest, CreateUserResponse } from './dtos/createUser.dto';
import { JwtRequest } from './types/JwtRequest';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  createUser(
    @Body() createUserResquest: CreateUserResquest,
  ): Promise<CreateUserResponse> {
    return this.userService.createUser(createUserResquest);
  }

  @Get('/me')
  getMe(@Request() req: JwtRequest) {
    return this.userService.findById(req.user.id);
  }
}
