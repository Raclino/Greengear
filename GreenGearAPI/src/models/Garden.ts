import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Plant } from "./Plant";
import { Sensor } from "./Sensor";
import { WeatherData } from "./Weather";
import { Task } from "./Task";
import { EventsCalendar } from "./EventsCalendar";
import { Hub } from "./Hub";

@Entity()
export class Garden {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  garden_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true, type: 'text' })
  imagePath?: string | null;

  @ManyToOne(() => User, (user) => user.gardens)
  user!: User;

  @ManyToOne(() => Hub, (hub) => hub.gardens)
  hub!: Hub;

  @OneToMany(() => Plant, (plant) => plant.garden)
  plants!: Plant[];

  // @OneToMany(() => Sensor, (sensor) => sensor.garden)
  // sensors!: Sensor[];

  @OneToMany(() => WeatherData, (weatherData) => weatherData.garden)
  weatherData!: WeatherData[];

  @OneToMany(() => Task, (task) => task.garden)
  tasks!: Task[];

  @OneToMany(() => EventsCalendar, (event) => event.garden)
  events!: EventsCalendar[];
}
