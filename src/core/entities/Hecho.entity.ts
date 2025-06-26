// src/core/entities/Hecho.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subtipo } from "./Subtipo.entity";
import { Barrio } from "./Barrio.entity";
import { Tiempo } from "./Tiempo.entity";
import { Franja } from "./Franja.entity";

@Entity()
export class Hecho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_mapa: string;

  @ManyToOne(() => Subtipo)
  subtipo: Subtipo;

  @ManyToOne(() => Barrio)
  barrio: Barrio;

  @ManyToOne(() => Tiempo)
  tiempo: Tiempo;

  @ManyToOne(() => Franja)
  franja: Franja;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  uso_arma: boolean;

  @Column()
  uso_moto: boolean;
}
