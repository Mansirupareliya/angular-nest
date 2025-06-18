import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { GenerateTokenProvider } from './services/generate-token.provider';
import { HashingProvider } from './services/hashing.provider';
import { AuthService } from './services/auth.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [GenerateTokenProvider, HashingProvider, AuthService],
})
export class AuthModule {}
