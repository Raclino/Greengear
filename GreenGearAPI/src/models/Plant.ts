import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
  import { Garden } from "./Garden";
  import { Recommendation } from "./Recommendation";
  
  @Entity()
  export class Plant {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    plant_name!: string;

    @Column()
    plant_description!: string;

    @Column({ nullable: true, type: 'text' })
    imagePath?: string | null;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Garden, (garden) => garden.plants)
    garden!: Garden;
  
    @OneToMany(() => Recommendation, (recommendation) => recommendation.plant)
    recommendations!: Recommendation[];
  }
  