import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/auth/types/UserPayload';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signRefreshToken(payload: UserPayload) {
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
