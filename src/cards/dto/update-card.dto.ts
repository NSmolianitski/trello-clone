import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCardDto {
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  @IsOptional()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @Length(0, 1000, {
    message: 'Description must be between 0 and 1000 characters',
  })
  @IsOptional()
  description: string;

  @IsNumber({}, { message: 'Column Id must be a number' })
  @IsOptional()
  columnId: number;
}
