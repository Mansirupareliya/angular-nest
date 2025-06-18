import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enum/auth-type.enum';
import { Response } from '@nestjs/common';
import { ResetPasswordDto } from '../dto/resetpassword.dto';

@Controller('api/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Auth(AuthType.None)
  public entry(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @Auth(AuthType.None)
  public signin(
    @Body() signInDto: LoginDto,
    @Response({ passthrough: true }) res,
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Post('reset-password')
  @Auth(AuthType.Bearer)
  public resetPasssword(@Body() resetPasswordDto: ResetPasswordDto){
    return this. authService.resetpassword(resetPasswordDto);
  }
}
