import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Thread } from "./Thread";
  
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column("text")
    content!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => User, (user) => user.posts)
    user!: User;
  
    @ManyToOne(() => Thread, (thread) => thread.posts)
    thread!: Thread;
  }
  