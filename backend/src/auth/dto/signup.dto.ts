import { IsNumber,Min, Max, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least one letter, one number and one special character',
  })
  password: string;

  @IsNumber()
  @Min(1000000000, { message: 'co_number must be a 10-digit number' })  
  @Max(9999999999, { message: 'co_number must be a 10-digit number' })  
  co_number: number;
}