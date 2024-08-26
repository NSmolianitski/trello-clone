import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';

@Controller('/api/users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  async findAll(@Param('cardId') cardId: number): Promise<Comment[]> {
    return await this.commentsService.findAllByCardId(cardId);
  }

  @Get('/:commentId')
  async findOne(@Param('commentId') commentId: number): Promise<Comment> {
    return await this.commentsService.findOneById(commentId);
  }

  @Post()
  async create(
    @Param('cardId') cardId: number,
    @Param('userId') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.create(cardId, userId, createCommentDto);
  }

  @Patch('/:commentId')
  async update(
    @Param('commentId') cardId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(cardId, updateCommentDto);
  }

  @Delete('/:commentId')
  async delete(@Param('commentId') commentId: number): Promise<void> {
    return await this.commentsService.delete(commentId);
  }
}
