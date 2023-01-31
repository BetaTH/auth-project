import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAccessGuard } from './auth/guards/jwt-access.guard';
import { JwtAccessStrategy } from './auth/strategies/jwtAccess.strategy';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [
    JwtAccessStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
  ],
})
export class AppModule {}
