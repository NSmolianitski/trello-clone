import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: 'Comment text', example: 'This is a comment' })
  @IsString({ message: 'Text must be a string' })
  @Length(1, 500, { message: 'Text must be between 1 and 500 characters' })
  text: string;
}
