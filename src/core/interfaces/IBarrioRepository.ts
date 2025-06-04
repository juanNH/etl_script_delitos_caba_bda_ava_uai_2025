import { Barrio } from "../entities/Barrio.entity";

export interface IBarrioRepository {
  save(data: Barrio): Promise<void>;

  saveMany(data: Barrio[]): Promise<void>;
}
