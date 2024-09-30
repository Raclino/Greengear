import "reflect-metadata";
import { createConnection, getRepository } from 'typeorm';
import { User } from '../models/User'; 
import dbConfig from "../config/database"; 

async function createAdminUser() {
  const connection = await createConnection(dbConfig);
  const userRepository = getRepository(User);

  const existingAdmin = await userRepository.findOne({ where: { username: "gearadmin" } });

  if (existingAdmin) {
    console.log("L'utilisateur admin existe déjà.");
  } else {
    const adminUser = new User();
    adminUser.username = "gearadmin";
    adminUser.first_name = "Admin";
    adminUser.last_name = "User";
    adminUser.email = "admin@example.com";
    adminUser.password = "greenadmin01";
    adminUser.role = "admin";
    adminUser.imagePath = "public/default-admin.jpg";

    try {
      await userRepository.save(adminUser);
      console.log("Utilisateur admin créé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur admin:", error);
    }
  }

  await connection.close();
}

createAdminUser();
