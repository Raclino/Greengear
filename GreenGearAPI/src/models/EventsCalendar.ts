import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Garden } from "./Garden";
  
  @Entity()
  export class EventsCalendar {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    event_name!: string;
  
    @Column()
    event_date!: Date;
  
    @ManyToOne(() => Garden, (garden) => garden.events)
    garden!: Garden;
  }
  