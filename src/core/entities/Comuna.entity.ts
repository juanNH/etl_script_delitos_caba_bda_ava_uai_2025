// src/core/entities/Comuna.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Barrio } from "./Barrio.entity";

@Entity()
export class Comuna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Barrio, barrio => barrio.comuna)
  barrios: Barrio[];
}
