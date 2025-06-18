import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dto/signup.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokenProvider } from './generate-token.provider';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

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
}
