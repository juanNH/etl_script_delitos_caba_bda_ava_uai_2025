import { Franja } from "../entities/Franja.entity";

export interface IFranjaRepository {
  save(data: Franja): Promise<void>;

  saveMany(data: Franja[]): Promise<void>;

  getAll(): Promise<Franja[]>;
}
