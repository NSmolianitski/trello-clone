import { IsString, Length } from 'class-validator';

export class CreateBoardColumnDto {
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  title: string;
}
