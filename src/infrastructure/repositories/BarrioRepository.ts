import { AppDataSource } from "../../config/database";
import { Barrio } from "../../core/entities/Barrio.entity";

export class BarrioRepository implements BarrioRepository {
    async saveMany(data: Barrio[]): Promise<void> {
        if (data.length === 0) return;
        const comunaRepo = AppDataSource.getRepository(Barrio);
        await comunaRepo.save(data);
    }
    async save(data: Barrio): Promise<void> {
        const comunaRepo = AppDataSource.getRepository(Barrio);
        await comunaRepo.save(data);
    }
    async getAll(): Promise<Barrio[]> {
        const tipoRepo = AppDataSource.getRepository(Barrio);
        return await tipoRepo.find();
    }
}
