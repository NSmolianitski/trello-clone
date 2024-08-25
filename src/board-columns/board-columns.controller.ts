import { Controller, Get } from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';

@Controller('api/users/:userId/columns')
export class BoardColumnsController {
  constructor(private readonly columnsService: BoardColumnsService) {}

  @Get()
  async findAll() {
    await this.columnsService.findAll();
  }
}
