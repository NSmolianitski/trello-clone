import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  position: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.boardColumns, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Card, (card) => card.column, { onDelete: 'CASCADE' })
  cards: Card[];
}
