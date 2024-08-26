import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
  @ApiProperty({ description: 'Card ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Card title', example: 'Card 1' })
  title: string;

  @ApiProperty({
    description: 'Card description',
    example: 'This is the first card',
  })
  description: string;

  @ApiProperty({
    description: 'Card creation date',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Card last update date',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Card column ID', example: 1 })
  columnId: number;

  @ApiProperty({ description: 'Card position', example: 1 })
  position: number;
}
