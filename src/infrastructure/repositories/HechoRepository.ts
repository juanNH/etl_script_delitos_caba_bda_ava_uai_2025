import { AppDataSource } from "../../config/database";
import { IHechoRepository } from "../../core/interfaces/IHechoRepository";
import { Hecho } from "../../core/entities/Hecho.entity";
import * as sql from "mssql";
import { mssqlConfig } from "../../config/mssql-config";

export class HechoRepository implements IHechoRepository {
    private pool: sql.ConnectionPool;

    async init(): Promise<void> {
        this.pool = await sql.connect(mssqlConfig);
    }
    async saveMany(data: Hecho[]): Promise<void> {
        if (data.length === 0) return;
        const hechoRepo = AppDataSource.getRepository(Hecho);
        await hechoRepo.save(data);
    }
    async save(data: Hecho): Promise<void> {
        const hechoRepo = AppDataSource.getRepository(Hecho);
        await hechoRepo.save(data);
    }

    async saveBulk(data: Partial<Hecho>[]): Promise<void> {
        if (!this.pool) throw new Error("Pool no inicializado");

        // 1) Levantar la tabla existente
        const table = new sql.Table("hecho");
        table.create = false; // <— muy importante

        table.columns.add("id_mapa", sql.NVarChar(255), { nullable: false });
        table.columns.add("fecha", sql.Date, { nullable: false });
        table.columns.add("franja", sql.NVarChar(255), { nullable: false });
        table.columns.add("latitud", sql.NVarChar(255), { nullable: false });
        table.columns.add("longitud", sql.NVarChar(255), { nullable: false });
        table.columns.add("uso_arma", sql.Bit, { nullable: false });
        table.columns.add("uso_moto", sql.Bit, { nullable: false });
        table.columns.add("subtipoId", sql.Int, { nullable: true });
        table.columns.add("barrioId", sql.Int, { nullable: true });


        data.forEach(d =>
            table.rows.add(
                d.id_mapa!,         // string
                d.fecha,              // Date
                d.franja!,          // string
                d.latitud!,         // string
                d.longitud!,        // string
                d.uso_arma ? 1 : 0, // bit
                d.uso_moto ? 1 : 0, // bit
                d.subtipo?.id,          // int | null
                d.barrio?.id            // int | null
            )
        );

        // Bulk insert
        await this.pool.request().bulk(table);
    }

    async close() {
        await this.pool.close();
    }
}
