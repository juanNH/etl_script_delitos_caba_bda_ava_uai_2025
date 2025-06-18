// src/core/entities/ExcelData.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExcelData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_mapa: number;

  @Column()
  anio: string;

  @Column()
  mes: string;
  
  @Column()
  dia: string;
}
