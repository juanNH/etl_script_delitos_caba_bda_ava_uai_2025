import { AppDataSource } from "../../config/database";
import { ITipoRepository } from "../../core/interfaces/ITipoRepository";
import { Tipo } from "../../core/entities/Tipo.entity";

export class TipoRepository implements ITipoRepository {
    async saveMany(data: Tipo[]): Promise<void> {
        if (data.length === 0) return;
        const tipoRepo = AppDataSource.getRepository(Tipo);
        await tipoRepo.save(data);
    }
    async save(data: Tipo): Promise<void> {
        const tipoRepo = AppDataSource.getRepository(Tipo);
        await tipoRepo.save(data);
    }

    async getAll(): Promise<Tipo[]> {
        const tipoRepo = AppDataSource.getRepository(Tipo);
        return await tipoRepo.find();
    }
}
