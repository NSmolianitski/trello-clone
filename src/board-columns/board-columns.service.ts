import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from './board-column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  async findAll(): Promise<BoardColumn[]> {
    return await this.columnRepository.find();
  }
}
