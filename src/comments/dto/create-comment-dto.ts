import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'Text must be a string' })
  @Length(1, 500, { message: 'Text must be between 1 and 500 characters' })
  text: string;
}
