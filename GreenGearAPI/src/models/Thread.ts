import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
  import { Forum } from "./Forum";
  import { Post } from "./Post";
  
  @Entity()
  export class Thread {
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
  
    @ManyToOne(() => Forum, (forum) => forum.id)
    forum!: Forum;
  
    @OneToMany(() => Post, (post) => post.id)
    posts!: Post[];
  }
  