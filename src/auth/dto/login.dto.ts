import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Wrong email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 16, {
    message: 'Password must be between 8 and 16 characters long',
  })
  password: string;
}
