import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '../cards/card.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  text: string;

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: Card;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.comments, {})
  author: User;
}
