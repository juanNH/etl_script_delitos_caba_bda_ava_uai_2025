import { ExcelData } from "../entities/ExcelData";

export interface IExcelRepository {
  save(data: ExcelData): Promise<void>;

  saveMany(data: ExcelData[]): Promise<void>;
}
