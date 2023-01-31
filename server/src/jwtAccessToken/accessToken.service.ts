import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/auth/types/UserPayload';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: UserPayload) {
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
