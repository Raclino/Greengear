import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Plant } from "./Plant";
  
  @Entity()
  export class Recommendation {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column("text")
    recommendation_text!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Plant, (plant) => plant.recommendations)
    plant!: Plant;
  }
  