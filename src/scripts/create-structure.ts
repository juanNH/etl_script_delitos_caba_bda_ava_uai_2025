import dotenv from "dotenv";
import { AppDataSource } from "../config/database";

dotenv.config();

async function createStructure() {
  try {
    await AppDataSource.initialize();
    console.log("Estructura de la base de datos creada exitosamente.");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error creando la estructura:", error);
    process.exit(1);
  }
}

createStructure();
