import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Sensor } from "./Sensor";
  
  @Entity()
  export class SensorData {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    data_type!: string;
  
    @Column()
    unity!: string;
  
    @Column("double precision")
    data!: number;
  
    @CreateDateColumn()
    date!: Date;
  
    @ManyToOne(() => Sensor, (sensor) => sensor.id)
    sensor!: Sensor;
  }
  