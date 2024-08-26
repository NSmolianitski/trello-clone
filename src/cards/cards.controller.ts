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
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { CardsMapper } from './cards.mapper';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('/api/users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardsMapper: CardsMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all cards in a column' })
  async findAll(
    @Param('columnId') columnId: number,
  ): Promise<CardResponseDto[]> {
    const cards = await this.cardsService.findAllByColumnId(columnId);
    return cards.map(this.cardsMapper.toCardResponseDto);
  }

  @Get('/:cardId')
  @ApiOperation({ summary: 'Get a card by id' })
  async findOne(@Param('cardId') cardId: number): Promise<CardResponseDto> {
    const card = await this.cardsService.findOneById(cardId);
    return this.cardsMapper.toCardResponseDto(card);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new card in a column' })
  async create(
    @Param('columnId') columnId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.cardsService.create(columnId, createCardDto);
    return this.cardsMapper.toCardResponseDto(card);
  }

  @Patch('/:cardId')
  @ApiOperation({ summary: 'Update a card' })
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.cardsService.update(cardId, updateCardDto);
    return this.cardsMapper.toCardResponseDto(card);
  }

  @Delete('/:cardId')
  @ApiOperation({ summary: 'Delete a card' })
  async delete(@Param('cardId') cardId: number): Promise<void> {
    return await this.cardsService.delete(cardId);
  }
}
