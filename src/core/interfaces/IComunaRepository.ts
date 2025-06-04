import { Comuna } from "../entities/Comuna.entity";

export interface IComunaRepository {
  save(data: Comuna): Promise<void>;

  saveMany(data: Comuna[]): Promise<void>;
}
