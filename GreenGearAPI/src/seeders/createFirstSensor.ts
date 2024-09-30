import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Sensor } from "../models/Sensor";
import dbConfig from "../config/database";
import { Hub } from "../models";

async function createUniqueSensor() {
  const connection = await createConnection(dbConfig);
  const sensorRepository = getRepository(Sensor);
  const hubRepository = getRepository(Hub);

  const existingSensor = await sensorRepository.findOne({
    where: {
      sensor_name: "Poseidon",
      sensor_type: "humidity",
      sensor_token: "f41a4822e8e367e7fc6955a1058eeb9a",
    },
  });

  if (existingSensor) {
    console.log("Le sensor est déjà présent.");
  } else {
    const newSensor = new Sensor();
    newSensor.sensor_name = "Poseidon";
    newSensor.sensor_type = "Humidite";
    newSensor.sensor_token = "f41a4822e8e367e7fc6955a1058eeb9a";

    const hub = await hubRepository.findOne({
      where: {
        hub_token: "4822f41a7fc6955a105e8e367e8d8eeb",
      },
    });

    if (hub) {
      newSensor.hub = hub;
    } else {
      console.log("Hub not found to link the sensor.");
    }

    try {
      await sensorRepository.save(newSensor);
      console.log("Nouveau sensor créé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création du sensor:", error);
    }
  }

  await connection.close();
}

createUniqueSensor();
