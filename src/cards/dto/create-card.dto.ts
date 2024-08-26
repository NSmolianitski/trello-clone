import { IsString, Length } from 'class-validator';

export class CreateCardDto {
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @Length(1, 1000, { message: 'Description must be between 1 and 1000 characters' })
  description: string;
}
