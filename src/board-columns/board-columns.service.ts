import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from './board-column.entity';
import { Repository } from 'typeorm';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnsRepository: Repository<BoardColumn>,
    private readonly usersService: UsersService,
  ) {}

  async findAllByUserId(userId: number): Promise<BoardColumn[]> {
    return await this.boardColumnsRepository
      .createQueryBuilder('boardColumn')
      .where('boardColumn.userId = :userId', { userId })
      .getMany();
  }

  async findOneById(id: number): Promise<BoardColumn> {
    const column = await this.boardColumnsRepository.findOneBy({ id });

    if (column === null) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    return column;
  }

  async create(
    userId: number,
    createColumnDto: CreateBoardColumnDto,
  ): Promise<BoardColumn> {
    const column = new BoardColumn();
    column.title = createColumnDto.title;
    column.user = await this.usersService.findOneById(userId);

    return await this.boardColumnsRepository.save(column);
  }

  async update(
    id: number,
    updateBoardColumnDto: UpdateBoardColumnDto,
  ): Promise<BoardColumn> {
    const column = await this.boardColumnsRepository.findOneBy({ id });
    if (column === null) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    if (updateBoardColumnDto.title) column.title = updateBoardColumnDto.title;
    return await this.boardColumnsRepository.save(column);
  }

  async delete(id: number): Promise<void> {
    const result = await this.boardColumnsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }
  }
}
