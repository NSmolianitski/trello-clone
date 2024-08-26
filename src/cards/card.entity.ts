import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardColumn } from '../board-columns/board-column.entity';

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
}
