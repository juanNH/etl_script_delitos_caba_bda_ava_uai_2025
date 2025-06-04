// src/core/entities/Subtipo.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tipo } from "./Tipo.entity";

@Entity()
export class Subtipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Tipo, tipo => tipo.subtipos)
  tipo: Tipo;
}
