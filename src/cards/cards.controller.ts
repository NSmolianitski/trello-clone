import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('/api/users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  async findAll(@Param('columnId') columnId: number): Promise<Card[]> {
    return await this.cardsService.findAllByColumnId(columnId);
  }

  @Get('/:cardId')
  async findOne(@Param('cardId') cardId: number): Promise<Card> {
    return await this.cardsService.findOneById(cardId);
  }

  @Post()
  async create(
    @Param('columnId') columnId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return await this.cardsService.create(columnId, createCardDto);
  }

  @Patch('/:cardId')
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return await this.cardsService.update(cardId, updateCardDto);
  }

  @Delete('/:cardId')
  async delete(@Param('cardId') cardId: number): Promise<void> {
    return await this.cardsService.delete(cardId);
  }
}
