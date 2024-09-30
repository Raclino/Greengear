import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Product } from "./Product";
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    quantity!: number;
  
    @Column("decimal")
    total_amount!: number;
  
    @Column()
    transaction_date!: Date;
  
    @ManyToOne(() => User, (user) => user.transactions)
    user!: User;
  
    @ManyToOne(() => Product, (product) => product.id)
    product!: Product;
  }
  