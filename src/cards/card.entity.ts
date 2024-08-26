import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardColumn } from '../board-columns/board-column.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: BoardColumn;

  @OneToMany(() => Comment, (comment) => comment.card, { onDelete: 'CASCADE' })
  comments: Comment[];
}
