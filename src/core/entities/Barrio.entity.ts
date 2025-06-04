// src/core/entities/Barrio.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comuna } from "./Comuna.entity";

@Entity()
export class Barrio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Comuna, comuna => comuna.barrios)
  comuna: Comuna;
}
