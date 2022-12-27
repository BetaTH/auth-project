import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserResquest, CreateUserResponse } from './dtos/createUser.dto';
import { User } from './user.entity';
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
  getMe(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }
}
