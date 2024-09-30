import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import userRoutes from './routes/userRoutes';
import gardenRoutes from './routes/gardenRoutes';
import plantRoutes from './routes/plantRoutes';
import sensorRoutes from './routes/sensorRoutes';
import hubRoutes from './routes/hubRoutes';
import dbConfig from "./config/database";
import path from "path";


const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(cors());

app.use('/api', userRoutes);
app.use('/api', gardenRoutes);
app.use('/api', plantRoutes);
app.use('/api', sensorRoutes);
app.use('/api', hubRoutes);
app.use(Router);

app.use('/public', express.static('public'));

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });