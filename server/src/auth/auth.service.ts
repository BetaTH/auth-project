import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/utils/errors';
import { User } from '@prisma/client';
import { UserPayload } from './types/UserPayload';
import { UserToken } from './types/UserToken';
import { RefreshTokenService } from '../jwtRefreshToken/refreshToken.service';
import { AccessTokenService } from 'src/jwtAccessToken/accessToken.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const access_token = this.accessTokenService.signAccessToken(payload);
    const refresh_token = this.refreshTokenService.signRefreshToken(payload);
    return {
      access_token,
      refresh_token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email adress or password provided is incorret',
    );
  }
}
