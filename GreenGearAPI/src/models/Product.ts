import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Shop } from "./Shop";
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    product_name!: string;
  
    @Column("decimal")
    price!: number;
  
    @Column("text")
    description!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Shop, (shop) => shop.id)
    shop!: Shop;
  }
  