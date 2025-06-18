import { AppDataSource } from "../../config/database";
import { ISubTipoRepository } from "../../core/interfaces/ISubtipoRepository";
import { Subtipo } from "../../core/entities/Subtipo.entity";

export class SubTipoRepository implements ISubTipoRepository {
    async saveMany(data: Subtipo[]): Promise<void> {
        if (data.length === 0) return;
        const subTipoRepo = AppDataSource.getRepository(Subtipo);
        await subTipoRepo.save(data);
    }
    async save(data: Subtipo): Promise<void> {
        const subTipoRepo = AppDataSource.getRepository(Subtipo);
        await subTipoRepo.save(data);
    }

    async getAll(): Promise<Subtipo[]> {
        const subTipoRepo = AppDataSource.getRepository(Subtipo);
        return await subTipoRepo.find();
    }
}
