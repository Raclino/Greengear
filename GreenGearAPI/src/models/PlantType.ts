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
  export class PlantType {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    type_name!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Plant, (plant) => plant.id)
    plant!: Plant;
  }
  