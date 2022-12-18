import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserResquest, CreateUserResponse } from './dtos/createUser.dto';
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
}
