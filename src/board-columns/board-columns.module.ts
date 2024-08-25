import { Module } from '@nestjs/common';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumnsService } from './board-columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from './board-column.entity';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([BoardColumn, User])],
  providers: [BoardColumnsService],
  controllers: [BoardColumnsController],
})
export class BoardColumnsModule {}
