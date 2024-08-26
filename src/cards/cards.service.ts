import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.cardsRepository.save(card);
  }

  async delete(id: number): Promise<void> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
  }
}
