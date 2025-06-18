// src/core/entities/Hecho.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subtipo } from "./Subtipo.entity";
import { Barrio } from "./Barrio.entity";

@Entity()
export class Hecho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_mapa: string;

  @Column({ type: "date" })
  fecha: Date;

  @Column()
  franja: string;

  @ManyToOne(() => Subtipo)
  subtipo: Subtipo;

  @ManyToOne(() => Barrio)
  barrio: Barrio;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  uso_arma: boolean;

  @Column()
  uso_moto: boolean;
}
