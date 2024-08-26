import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    column.position = (await this.findAllByUserId(userId)).length + 1;

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

    if (updateBoardColumnDto.title) {
      column.title = updateBoardColumnDto.title;
    }
    if (updateBoardColumnDto.position) {
      const newPosition = updateBoardColumnDto.position;
      const oldPosition = column.position;

      column.position = newPosition;

      await this.updateColumnsOrder(
        column.userId,
        newPosition,
        oldPosition,
        column.id,
      );
    }
    return await this.boardColumnsRepository.save(column);
  }

  private async updateColumnsOrder(
    userId: number,
    newPosition: number,
    oldPosition: number,
    excludeColumnId: number,
  ): Promise<void> {
    const columns = await this.findAllByUserId(userId);

    if (newPosition < 0 || newPosition > columns.length)
      throw new BadRequestException(`Invalid column position: ${newPosition}`);

    if (newPosition === 0) {
      newPosition = columns.length + 1;
    }

    if (newPosition > oldPosition) {
      this.moveColumnsLeft(newPosition, oldPosition, columns, excludeColumnId);
    } else if (newPosition < oldPosition) {
      this.moveColumnsRight(newPosition, oldPosition, columns, excludeColumnId);
    }

    await this.boardColumnsRepository.save(columns);
  }

  private moveColumnsLeft(
    newPosition: number,
    oldPosition: number,
    columns: BoardColumn[],
    excludeColumnId: number,
  ): void {
    let column: BoardColumn;
    for (column of columns) {
      if (column.id === excludeColumnId) continue;

      if (column.position > oldPosition && column.position <= newPosition) {
        column.position--;
      }
    }
  }

  private moveColumnsRight(
    newPosition: number,
    oldPosition: number,
    columns: BoardColumn[],
    excludeColumnId: number,
  ): void {
    let column: BoardColumn;
    for (column of columns) {
      if (column.id === excludeColumnId) continue;

      if (column.position < oldPosition && column.position >= newPosition) {
        column.position++;
      }
    }
  }

  async delete(id: number): Promise<void> {
    const column = await this.boardColumnsRepository.findOneBy({ id });
    if (column === null) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    const result = await this.boardColumnsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Column with id ${id} deletion failed`);
    }

    await this.updateColumnsOrder(column.userId, 0, column.position, column.id);
  }
}
