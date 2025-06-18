import { Hecho } from "../entities/Hecho.entity";

export interface IHechoRepository {
  save(data: Hecho): Promise<void>;

  saveMany(data: Hecho[]): Promise<void>;
}
