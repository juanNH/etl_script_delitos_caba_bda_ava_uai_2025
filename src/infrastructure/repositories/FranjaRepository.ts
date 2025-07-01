import { AppDataSource } from "../../config/database";
import { Franja } from "../../core/entities/Franja.entity";
import { IFranjaRepository } from "../../core/interfaces/IFranjaRepository";

export class FranjaRepository implements IFranjaRepository {
    async saveMany(data: Franja[]): Promise<void> {
        if (data.length === 0) return;
        const franjaRepo = AppDataSource.getRepository(Franja);
        await franjaRepo.save(data);
    }
    async save(data: Franja): Promise<void> {
        const franjaRepo = AppDataSource.getRepository(Franja);
        await franjaRepo.save(data);
    }

    async getAll(): Promise<Franja[]> {
        const franjaRepo = AppDataSource.getRepository(Franja);
        return await franjaRepo.find();
    }
}
