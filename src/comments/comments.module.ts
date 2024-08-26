import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Card } from '../cards/card.entity';
import { User } from '../users/user.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CardsModule } from '../cards/cards.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CardsModule,
    UsersModule,
    TypeOrmModule.forFeature([Comment, Card, User]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
