import { ConnectionOptions } from "typeorm";
import { SensorData, User, Garden, Plant, Recommendation, PlantType, Forum, Thread, Post, Shop, Product, Sensor, WeatherData, Task, EventsCalendar, Transaction, UserReview, Hub } from "../models";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "green_gear_user",
  password: process.env.POSTGRES_PASSWORD || "passwd",
  database: process.env.POSTGRES_DB || "green_gear_db",
  entities: [User, Garden, Plant, Recommendation, PlantType, Forum, Thread, Post, Shop, Product, Sensor,SensorData, WeatherData, Task, EventsCalendar, Transaction, UserReview, Hub],
  synchronize: true,
};

export default config;