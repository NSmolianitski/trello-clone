import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ description: 'Card Title', example: 'New Card Title' })
  @IsString({ message: 'Title must be a string' })
  @Length(1, 50, { message: 'Title must be between 1 and 50 characters' })
  title: string;

  @ApiProperty({
    description: 'Card Description',
    example: 'Description of the card',
  })
  @IsString({ message: 'Description must be a string' })
  @Length(1, 1000, { message: 'Description must be between 1 and 1000 characters' })
  description: string;
}
