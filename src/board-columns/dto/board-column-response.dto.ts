import { ApiProperty } from '@nestjs/swagger';

export class BoardColumnResponseDto {
  @ApiProperty({ description: 'Column ID', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Column creation date',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Column last update date',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Column title', example: 'To-do' })
  title: string;

  @ApiProperty({ description: 'Column position', example: 1 })
  position: number;
}
