import { AppDataSource } from "../../config/database";
import { Comuna } from "../../core/entities/Comuna.entity";
import { IComunaRepository } from "../../core/interfaces/IComunaRepository";

export class ComunaRepository implements IComunaRepository {
    async saveMany(data: Comuna[]): Promise<void> {
        if (data.length === 0) return;
        const comunaRepo = AppDataSource.getRepository(Comuna);
        await comunaRepo.save(data);
    }
    async save(data: Comuna): Promise<void> {
        const comunaRepo = AppDataSource.getRepository(Comuna);
        await comunaRepo.save(data);
    }
    async getAll(): Promise<Comuna[]> {
        const tipoRepo = AppDataSource.getRepository(Comuna);
        return await tipoRepo.find();
    }
}
