import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Garden } from "./Garden";
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column("text")
    task_description!: string;
  
    @Column()
    due_date!: Date;
  
    @ManyToOne(() => Garden, (garden) => garden.tasks)
    garden!: Garden;
  }
  