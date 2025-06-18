import { Subtipo } from "../entities/Subtipo.entity";

export interface ISubTipoRepository {
  save(data: Subtipo): Promise<void>;

  saveMany(data: Subtipo[]): Promise<void>;

  getAll(): Promise<Subtipo[]>;
  
}
