﻿import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardColumn } from '../board-columns/board-column.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.user, {
    onDelete: 'CASCADE',
  })
  boardColumns: BoardColumn[];

  @OneToMany(() => Comment, (comment) => comment.author, {})
  comments: Comment[];
}
