import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enum/auth-type.enum';
@Controller('api/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Auth(AuthType.None)
  public entry(
    @Body() signupDto: SignUpDto,
  ) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @Auth(AuthType.None)
  public signin(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }
}