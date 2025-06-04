import { DataSource } from "typeorm";
import { Comuna } from "../core/entities/Comuna.entity";
import { Barrio } from "../core/entities/Barrio.entity";
import { Tipo } from "../core/entities/Tipo.entity";
import { Subtipo } from "../core/entities/Subtipo.entity";
import { Hecho } from "../core/entities/Hecho.entity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,  // Sincroniza las entidades con la base de datos (solo en desarrollo)
  logging: false,
  entities: [Comuna, Barrio, Tipo, Subtipo, Hecho],
  migrations: [],
  subscribers: [],
});
