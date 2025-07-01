// src/core/entities/Tiempo.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Tiempo {
    @PrimaryColumn()
    fechaId: number;

    @Column({ type: "date" })
    fecha: Date;

    @Column()
    dia: string;

    @Column()
    mes: string;

    @Column()
    anio: string;

    @Column()
    trimestre: string;

    @Column()
    cuatrimestre: string;
}
