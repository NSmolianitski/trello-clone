import { IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardColumnDto {
  @ApiProperty({ description: 'Column title', example: 'To-do' })
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  @IsOptional()
  title: string;

  @ApiProperty({ description: 'Column position', example: 1 })
  @IsOptional()
  @Min(1, { message: 'Position must be greater than or equal to 1' })
  position: number;
}
