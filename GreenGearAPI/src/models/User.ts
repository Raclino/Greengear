import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Garden } from "./Garden";
import { Post } from "./Post";
import { Transaction } from "./Transaction";
import { UserReview } from "./UserReview";
import { Hub } from "./Hub";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column({ nullable: true, type: 'text' })
  imagePath?: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Garden, (garden) => garden.user)
  gardens!: Garden[];  

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @OneToMany(() => UserReview, (review) => review.user)
  reviews!: UserReview[];

  @OneToMany(() => Hub, (hub) => hub.user)
  hubs!: Hub[];
}
