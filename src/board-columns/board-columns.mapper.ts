import { BoardColumnResponseDto } from './dto/board-column-response.dto';
import { BoardColumn } from './board-column.entity';

export class BoardColumnsMapper {
  toBoardColumnResponseDto(boardColumn: BoardColumn): BoardColumnResponseDto {
    return {
      id: boardColumn.id,
      title: boardColumn.title,
      createdAt: boardColumn.createdAt,
      updatedAt: boardColumn.updatedAt,
    };
  }
}
