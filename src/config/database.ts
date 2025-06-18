import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comuna } from "../core/entities/Comuna.entity";
import { Barrio } from "../core/entities/Barrio.entity";
import { Tipo } from "../core/entities/Tipo.entity";
import { Subtipo } from "../core/entities/Subtipo.entity";
import { Hecho } from "../core/entities/Hecho.entity";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "mssql",

  // Conexión a SQL Server Express en local por TCP fijo en 1433
  host: process.env.DB_HOST || "localhost",          // o "JUAN" si prefieres, pero “localhost” suele funcionar
  port: Number(process.env.DB_PORT) || 1433,                 // El puerto donde SQLEXPRESS escucha (ya configuraste esto)
  username: process.env.DB_USERNAME || "etluser",       // El login SQL que creaste
  password: process.env.DB_USERNAME || "etluser",// Su contraseña
  database: process.env.DB_DATABASE || "caba_delitos" ,   // La base que creaste

  synchronize: true,          // Solo en desarrollo: TypeORM crea/ajusta tablas
  logging: false,             // Desactivá logs SQL de TypeORM

  // Opciones del driver Tedious para entornos locales
  options: {
    encrypt: false,                // En local no usamos TLS
    trustServerCertificate: true,  // Confiamos en el certificado autofirmado
    enableArithAbort: true         // Necesario para compatibilidad con algunas versiones
  },

  // Ya NO definimos "authentication" (que era para NTLM), porque con username/password
  // TypeORM entiende que usamos SQL Authentication.
  entities: [Comuna, Barrio, Tipo, Subtipo, Hecho]
});