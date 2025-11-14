import { Injectable } from '@nestjs/common';
import { AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly betterAuthService: BetterAuthService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    return this.betterAuthService.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    return this.betterAuthService.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  }
}
