import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ description: 'Comment ID', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Comment last update date',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Comment text', example: 'This is a comment' })
  text: string;

  @ApiProperty({ description: 'Author ID', example: 1 })
  authorId: number;

  @ApiProperty({ description: 'Card ID', example: 1 })
  cardId: number;
}
