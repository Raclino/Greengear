import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Garden } from "./Garden";
  
  @Entity()
  export class WeatherData {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column("decimal")
    temperature!: number;
  
    @Column("decimal")
    humidity!: number;
  
    @Column("decimal")
    precipitation!: number;
  
    @CreateDateColumn()
    recorded_at!: Date;
  
    @ManyToOne(() => Garden, (garden) => garden.weatherData)
    garden!: Garden;
  }
  