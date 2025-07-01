// src/core/entities/Subtipo.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Franja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  franja: string;

}
