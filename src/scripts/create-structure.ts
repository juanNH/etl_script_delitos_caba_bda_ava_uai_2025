import "reflect-metadata";     
import { AppDataSource } from "../config/database";

async function createStructure() {
  try {
    console.log("Conectando a localhost:1433 …");
    await AppDataSource.initialize();
    console.log("✅ Estructura creada correctamente.");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error creando la estructura:", error);
    process.exit(1);
  }
}

createStructure();
