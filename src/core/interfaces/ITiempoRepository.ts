import { Tiempo } from "../entities/Tiempo.entity";

export interface ITiempoRepository {
    save(data: Tiempo): Promise<void>;

    saveMany(data: Tiempo[]): Promise<void>;

    getAll(): Promise<Tiempo[]>;

    saveBulk(data: Tiempo[]): Promise<void>;

    init(): Promise<void>
}
