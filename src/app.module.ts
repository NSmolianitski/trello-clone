import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumnsModule } from './board-columns/board-columns.module';
import { User } from './users/user.entity';
import { BoardColumn } from './board-columns/board-column.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'TrelloDatabase',
      entities: [User, BoardColumn],
      synchronize: true,
    }),
    UsersModule,
    BoardColumnsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
