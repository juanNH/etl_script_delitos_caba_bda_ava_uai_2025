import { AppDataSource } from "../../config/database";
import { ISubTipoRepository } from "../../core/interfaces/ISubtipoRepository";
import { Subtipo } from "../../core/entities/Subtipo.entity";

export class SubTipoRepository implements ISubTipoRepository {
    async saveMany(data: Subtipo[]): Promise<void> {
        if (data.length === 0) return;
        const tipoRepo = AppDataSource.getRepository(Subtipo);
        await tipoRepo.save(data);
    }
    async save(data: Subtipo): Promise<void> {
        const tipoRepo = AppDataSource.getRepository(Subtipo);
        await tipoRepo.save(data);
    }
}
