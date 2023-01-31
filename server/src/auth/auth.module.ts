import { Module } from '@nestjs/common';
import { AccessTokenModule } from './jwtAccessToken/accessToken.module';
import { RefreshTokenModule } from './jwtRefreshToken/refreshToken.module';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwtRefresh.strategy';

@Module({
  imports: [RefreshTokenModule, AccessTokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
