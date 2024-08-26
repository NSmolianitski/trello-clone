import { Card } from './card.entity';
import { CardResponseDto } from './dto/card-response.dto';

export class CardsMapper {
  toCardResponseDto(card: Card): CardResponseDto {
    return {
      id: card.id,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      title: card.title,
      description: card.description,
      columnId: card.columnId,
      position: card.position,
    };
  }
}
