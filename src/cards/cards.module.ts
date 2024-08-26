import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from '../board-columns/board-column.entity';
import { Card } from './card.entity';
import { BoardColumnsModule } from '../board-columns/board-columns.module';
import { CardsMapper } from './cards.mapper';

@Module({
  imports: [BoardColumnsModule, TypeOrmModule.forFeature([Card, BoardColumn])],
  controllers: [CardsController],
  providers: [CardsService, CardsMapper],
  exports: [CardsService],
})
export class CardsModule {}
