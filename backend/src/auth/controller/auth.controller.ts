import { Body, Controller, Post, Put } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enum/auth-type.enum';
import { Response } from '@nestjs/common';
import { ResetPasswordDto } from '../dto/resetpassword.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../decorator/user.decorator.';

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
  @Auth(AuthType.None)
  public resetPasssword(@Body() resetPasswordDto: ResetPasswordDto){
    return this. authService.resetpassword(resetPasswordDto);
  }

  @Post('logout')
  @Auth(AuthType.Bearer)
  public logout(@Response({passthrough:true})res){
    res.clearCookie('access_token');
    return {message : 'user logged out successfully'};
  }

  @Put('update')
  @Auth(AuthType.Bearer)
  public update(@User() user, @Body() updatedto: UpdateUserDto){
    return this.authService.updateUser(user,updatedto);
  }
}
