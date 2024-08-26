import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({ description: 'Title of the card', example: 'New Card Title' })
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Card Description',
    example: 'Description of the card',
  })
  @IsString({ message: 'Description must be a string' })
  @Length(0, 1000, {
    message: 'Description must be between 0 and 1000 characters',
  })
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Column Id of the card', example: 1 })
  @IsNumber({}, { message: 'Column Id must be a number' })
  @IsOptional()
  columnId: number;
}
