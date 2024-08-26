import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardColumnDto {
  @ApiProperty({ description: 'Column title', example: 'To-do' })
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  title: string;
}
