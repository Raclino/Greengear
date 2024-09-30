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
import { Sensor } from "./Sensor";
import { User } from "./User";

@Entity()
export class Hub {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    hub_name!: string;

    @Column()
    hub_version!: string;

    @Column()
    hub_token!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => Garden, (garden) => garden.hub)
    gardens?: Garden[];

    @OneToMany(() => Sensor, (sensor) => sensor.hub)
    sensors!: Sensor[];

    @ManyToOne(() => User, (user) => user.hubs)
    user?: User;
}