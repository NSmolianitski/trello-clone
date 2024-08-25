import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBoardColumnDto {
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  @IsOptional()
  title: string;
}
