import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { RefreshTokenService } from './refreshToken.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
