import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CardsService } from '../cards/cards.service';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UsersService } from '../users/users.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}

  async findAllByCardId(cardId: number): Promise<Comment[]> {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.cardId = :cardId', { cardId })
      .getMany();
  }

  async findOneById(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  async create(
    cardId: number,
    authorId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.text = createCommentDto.text;
    comment.card = await this.cardsService.findOneById(cardId);
    comment.author = await this.usersService.findOneById(authorId);

    return await this.commentsRepository.save(comment);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (comment === null) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (updateCommentDto.text) comment.text = updateCommentDto.text;
    return await this.commentsRepository.save(comment);
  }

  async delete(id: number): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
