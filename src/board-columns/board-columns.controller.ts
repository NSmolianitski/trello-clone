import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';
import { BoardColumn } from './board-column.entity';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';

@Controller('api/users/:userId/columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnsService: BoardColumnsService) {}

  @Get()
  async findAll(@Param('userId') userId: number): Promise<BoardColumn[]> {
    return await this.boardColumnsService.findAllByUserId(userId);
  }

  @Get('/:columnId')
  async findOne(@Param('columnId') columnId: number): Promise<BoardColumn> {
    return await this.boardColumnsService.findOneById(columnId);
  }

  @Post()
  async create(
    @Param('userId') userId: number,
    @Body() createBoardColumnDto: CreateBoardColumnDto,
  ): Promise<BoardColumn> {
    return await this.boardColumnsService.create(userId, createBoardColumnDto);
  }

  @Patch('/:columnId')
  async update(
    @Param('columnId') columnId: number,
    @Body() updateBoardColumnDto: UpdateBoardColumnDto,
  ): Promise<BoardColumn> {
    return await this.boardColumnsService.update(
      columnId,
      updateBoardColumnDto,
    );
  }

  @Delete('/:columnId')
  async delete(@Param('columnId') id: number): Promise<void> {
    return await this.boardColumnsService.delete(id);
  }
}
