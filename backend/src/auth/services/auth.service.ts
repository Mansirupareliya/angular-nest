import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokenProvider } from './generate-token.provider';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/resetpassword.dto';
import {  UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
@Injectable()
export class AuthService {
  constructor(
    
    private readonly userRepository: UserRepository,

    private readonly hashingProvider: HashingProvider,

    /**
     * generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async signup(signupDto: SignUpDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    if (existUser) {
      throw new BadRequestException('user already exist, enter a new email');
    }

    const newUser = this.userRepository.create({
      ...signupDto,
      password: await this.hashingProvider.hashPassword(signupDto.password),
    });
    return await this.userRepository.save(newUser);
  }

   public async signIn(signInDto: LoginDto, res): Promise<object> {
    try {
       const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });
      if (!user) throw new NotFoundException('User not found');


      const isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
      if (!isEqual) throw new UnauthorizedException('Incorrect Password');

      const token = await this.generateTokenProvider.generateTokens(user);
      res.cookie('access_token', token, { httpOnly: true });

      return {
        token,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      )
        throw error;
      throw new InternalServerErrorException('Sign-in failed');
    }
  }

  public async resetpassword(resetPasswordDto: ResetPasswordDto)
  {
    const { email, newPassword,confirmPassword} = resetPasswordDto;

    if(newPassword!=confirmPassword){
      throw new BadRequestException('Password do not match');
    }
    const user = await this. userRepository. findOne({where:{email}})

    if(!user){
      throw new NotFoundException('User not found');
    
    }
    user.password = await this.hashingProvider.hashPassword(newPassword);
    await this.userRepository.save(user);

    return {message : 'password updated successfully'};
  }

  public async updateUser(user,updateUserDto: UpdateUserDto){

    try{
      const existingUser = await this.userRepository.getByEmail(user.email);

      if(!existingUser){
        throw new BadRequestException('user not found');
      }
      existingUser.name = updateUserDto.name??existingUser.name;

      return await this.userRepository.save (existingUser);
    }
    catch{
      throw new InternalServerErrorException('update failed');
    }

  }
  public async remove(user):Promise<void>{
    
      const existingUser = await this.userRepository.getById(user.sub);
      if(!existingUser){
        throw new NotFoundException('User not found');
      }
      await this.userRepository.delete(user.sub);
   
  }
}
