import { Comment } from './comment.entity';
import { CommentResponseDto } from './dto/comment-response.dto';

export class CommentsMapper {
  toCommentResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      text: comment.text,
      cardId: comment.card.id,
      authorId: comment.author.id,
    };
  }
}
