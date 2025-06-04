import { Tipo } from "../entities/Tipo.entity";

export interface ITipoRepository {
  save(data: Tipo): Promise<void>;

  saveMany(data: Tipo[]): Promise<void>;

  getAll(): Promise<Tipo[]>;
}
