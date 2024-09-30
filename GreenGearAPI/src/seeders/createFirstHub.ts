import "reflect-metadata";
import { createConnection, getRepository } from 'typeorm';
import { Hub } from '../models/Hub';
import dbConfig from "../config/database";

async function createUniqueHub() {
  const connection = await createConnection(dbConfig);
  const hubRepository = getRepository(Hub);

  const existingHub = await hubRepository.findOne({
    where: { 
      hub_name: "Zeus",
      hub_version: "1.2",
      hub_token: "4822f41a7fc6955a105e8e367e8d8eeb"
    }
  });

  if (existingHub) {
    console.log("Le hub est present");
  } else {
    const newHub = new Hub();
    newHub.hub_name = "Zeus";
    newHub.hub_version = "1.2";
    newHub.hub_token = "4822f41a7fc6955a105e8e367e8d8eeb";


    try {
      await hubRepository.save(newHub);
      console.log("Premier hub créé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création du hub:", error);
    }
  }

  await connection.close();
}

createUniqueHub();
