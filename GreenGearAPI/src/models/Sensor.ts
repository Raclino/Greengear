import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Garden } from "./Garden";
import { Hub } from "./Hub";
  
  @Entity()
  export class Sensor {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    sensor_name!: string;
  
    @Column()
    sensor_type!: string;

    @Column()
    sensor_token!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    // @ManyToOne(() => Garden, (garden) => garden.sensors)
    // garden!: Garden;

    @ManyToOne(() => Hub, (hub) => hub.sensors)
    hub?: Hub;
  }
  