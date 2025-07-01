import "reflect-metadata";
import { AppDataSource } from "../config/database";
import dotenv from "dotenv";
dotenv.config();

async function createStructure() {
  try {
    console.log("DB_SERVER en runtime:", process.env.DB_SERVER);
    console.log("DB_DATABASE en runtime:", process.env.DB_DATABASE);
    await AppDataSource.initialize();
    console.log("✅ Estructura creada correctamente.");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error creando la estructura:", error);
    process.exit(1);
  }
}

createStructure();
