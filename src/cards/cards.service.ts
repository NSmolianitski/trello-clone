import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BoardColumnsService } from '../board-columns/board-columns.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
    private readonly boardColumnsService: BoardColumnsService,
  ) {}

  async findAllByColumnId(columnId: number): Promise<Card[]> {
    return await this.cardsRepository
      .createQueryBuilder('card')
      .where('card.columnId = :columnId', { columnId })
      .getMany();
  }

  async findOneById(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    return card;
  }

  async create(columnId: number, createCardDto: CreateCardDto): Promise<Card> {
    const card = new Card();
    card.title = createCardDto.title;
    card.description = createCardDto.description;
    card.column = await this.boardColumnsService.findOneById(columnId);
    card.position = (await this.findAllByColumnId(columnId)).length + 1;

    return await this.cardsRepository.save(card);
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (card === null) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    const column = await this.boardColumnsService.findOneById(
      updateCardDto.columnId,
    );

    if (updateCardDto.title) card.title = updateCardDto.title;
    if (updateCardDto.description) card.description = updateCardDto.description;
    if (updateCardDto.columnId) card.column = column;
    if (updateCardDto.position) {
      const newPosition = updateCardDto.position;
      const oldPosition = card.position;

      card.position = newPosition;

      await this.updateCardsOrder(
        card.columnId,
        newPosition,
        oldPosition,
        card.id,
      );
    }

    return await this.cardsRepository.save(card);
  }

  private async updateCardsOrder(
    columnId: number,
    newPosition: number,
    oldPosition: number,
    excludeCardId: number,
  ): Promise<void> {
    const cards = await this.findAllByColumnId(columnId);

    if (newPosition < 0 || newPosition > cards.length)
      throw new BadRequestException(`Invalid card position: ${newPosition}`);

    if (newPosition === 0) {
      newPosition = cards.length + 1;
    }

    if (newPosition > oldPosition) {
      this.moveCardsUp(newPosition, oldPosition, cards, excludeCardId);
    } else if (newPosition < oldPosition) {
      this.moveCardsDown(newPosition, oldPosition, cards, excludeCardId);
    }

    await this.cardsRepository.save(cards);
  }

  private moveCardsUp(
    newPosition: number,
    oldPosition: number,
    cards: Card[],
    excludeCardId: number,
  ): void {
    let card: Card;
    for (card of cards) {
      if (card.id === excludeCardId) continue;

      if (card.position > oldPosition && card.position <= newPosition) {
        card.position--;
      }
    }
  }

  private moveCardsDown(
    newPosition: number,
    oldPosition: number,
    cards: Card[],
    excludeCardId: number,
  ): void {
    let card: Card;
    for (card of cards) {
      if (card.id === excludeCardId) continue;

      if (card.position < oldPosition && card.position >= newPosition) {
        card.position++;
      }
    }
  }

  async delete(id: number): Promise<void> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (card === null) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    await this.updateCardsOrder(card.columnId, 0, card.position, card.id);
  }
}
