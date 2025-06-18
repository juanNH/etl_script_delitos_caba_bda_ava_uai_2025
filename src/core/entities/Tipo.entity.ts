// src/core/entities/Tipo.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Subtipo } from "./Subtipo.entity";

@Entity()
export class Tipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Subtipo, subtipo => subtipo.tipo)
  subtipos: Subtipo[];
}
