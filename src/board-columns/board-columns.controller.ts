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
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { BoardColumnResponseDto } from './dto/board-column-response.dto';
import { BoardColumnsMapper } from './board-columns.mapper';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Board Columns')
@Controller('api/users/:userId/columns')
export class BoardColumnsController {
  constructor(
    private readonly boardColumnsService: BoardColumnsService,
    private readonly boardColumnsMapper: BoardColumnsMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all user columns' })
  async findAll(
    @Param('userId') userId: number,
  ): Promise<BoardColumnResponseDto[]> {
    const columns = await this.boardColumnsService.findAllByUserId(userId);
    return columns.map(this.boardColumnsMapper.toBoardColumnResponseDto);
  }

  @Get('/:columnId')
  @ApiOperation({ summary: 'Get a column by id' })
  async findOne(
    @Param('columnId') columnId: number,
  ): Promise<BoardColumnResponseDto> {
    const column = await this.boardColumnsService.findOneById(columnId);
    return this.boardColumnsMapper.toBoardColumnResponseDto(column);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new column' })
  async create(
    @Param('userId') userId: number,
    @Body() createBoardColumnDto: CreateBoardColumnDto,
  ): Promise<BoardColumnResponseDto> {
    const column = await this.boardColumnsService.create(
      userId,
      createBoardColumnDto,
    );
    return this.boardColumnsMapper.toBoardColumnResponseDto(column);
  }

  @Patch('/:columnId')
  @ApiOperation({ summary: 'Update a column' })
  async update(
    @Param('columnId') columnId: number,
    @Body() updateBoardColumnDto: UpdateBoardColumnDto,
  ): Promise<BoardColumnResponseDto> {
    const column = await this.boardColumnsService.update(
      columnId,
      updateBoardColumnDto,
    );
    return this.boardColumnsMapper.toBoardColumnResponseDto(column);
  }

  @Delete('/:columnId')
  @ApiOperation({ summary: 'Delete a column' })
  async delete(@Param('columnId') id: number): Promise<void> {
    return await this.boardColumnsService.delete(id);
  }
}
