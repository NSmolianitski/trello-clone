import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CommentsMapper } from './comments.mapper';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('/api/users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentsMapper: CommentsMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments of a card' })
  async findAll(
    @Param('cardId') cardId: number,
  ): Promise<CommentResponseDto[]> {
    const comments = await this.commentsService.findAllByCardId(cardId);
    return comments.map(this.commentsMapper.toCommentResponseDto);
  }

  @Get('/:commentId')
  @ApiOperation({ summary: 'Get a comment by id' })
  async findOne(
    @Param('commentId') commentId: number,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.findOneById(commentId);
    return this.commentsMapper.toCommentResponseDto(comment);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  async create(
    @Param('cardId') cardId: number,
    @Param('userId') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.create(
      cardId,
      userId,
      createCommentDto,
    );
    return this.commentsMapper.toCommentResponseDto(comment);
  }

  @Patch('/:commentId')
  @ApiOperation({ summary: 'Update a comment' })
  async update(
    @Param('commentId') cardId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.update(cardId, updateCommentDto);
    return this.commentsMapper.toCommentResponseDto(comment);
  }

  @Delete('/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  async delete(@Param('commentId') commentId: number): Promise<void> {
    return await this.commentsService.delete(commentId);
  }
}
