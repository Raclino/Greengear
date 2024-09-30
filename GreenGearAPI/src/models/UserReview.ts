import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { Product } from "./Product";
  import { User } from "./User";
  
  @Entity()
  export class UserReview {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column("text")
    review_text!: string;
  
    @Column("decimal")
    rating!: number;
  
    @Column()
    review_date!: Date;
  
    @ManyToOne(() => Product, (product) => product.id)
    product!: Product;
  
    @ManyToOne(() => User, (user) => user.id)
    user!: User;
  }
  