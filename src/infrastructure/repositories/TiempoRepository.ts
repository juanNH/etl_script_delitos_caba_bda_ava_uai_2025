import { AppDataSource } from "../../config/database";
import { mssqlConfig } from "../../config/mssql-config";
import { Tiempo } from "../../core/entities/Tiempo.entity";
import { ITiempoRepository } from "../../core/interfaces/ITiempoRepository";
import * as sql from "mssql";

export class TiempoRepository implements ITiempoRepository {

    private pool: sql.ConnectionPool;

    async init(): Promise<void> {
        this.pool = await sql.connect(mssqlConfig);
    }
    async saveMany(data: Tiempo[]): Promise<void> {
        if (data.length === 0) return;
        const tiempoRepo = AppDataSource.getRepository(Tiempo);
        await tiempoRepo.save(data);
    }
    async save(data: Tiempo): Promise<void> {
        const tiempoRepo = AppDataSource.getRepository(Tiempo);
        await tiempoRepo.save(data);
    }

    async getAll(): Promise<Tiempo[]> {
        const tiempoRepo = AppDataSource.getRepository(Tiempo);
        return await tiempoRepo.find();
    }

    async saveBulk(data: Partial<Tiempo>[]): Promise<void> {
        if (!this.pool) throw new Error("Pool no inicializado");

        // 1) Levantar la tabla existente
        const table = new sql.Table("tiempo");
        table.create = false;

        table.columns.add("fechaId", sql.Int(), { nullable: false });
        table.columns.add("fecha", sql.Date, { nullable: false });
        table.columns.add("dia", sql.NVarChar(255), { nullable: false });
        table.columns.add("mes", sql.NVarChar(255), { nullable: false });
        table.columns.add("anio", sql.NVarChar(255), { nullable: false });
        table.columns.add("trimestre", sql.NVarChar(255), { nullable: false });
        table.columns.add("cuatrimestre", sql.NVarChar(255), { nullable: false });


        data.forEach(d =>
            table.rows.add(
                d.fechaId!,
                d.fecha,
                d.dia,
                d.mes,
                d.anio,
                d.trimestre,
                d.cuatrimestre
            )
        );

        // Bulk insert
        await this.pool.request().bulk(table);
    }

    async close() {
        await this.pool.close();
    }
}
