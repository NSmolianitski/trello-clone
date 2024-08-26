import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiYUBtLnJ1IiwiaWF0IjoxNzI0NjY0MzAzLCJleHAiOjE3MjQ2Njc5MDN9.F_miyoXxKSFDNZ1Vq4u0htZjV86iGWuC2DJQSK9FxMw',
  })
  accessToken: string;
}
