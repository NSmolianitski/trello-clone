import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BoardColumn } from '../board-columns/board-column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BoardColumn])],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
