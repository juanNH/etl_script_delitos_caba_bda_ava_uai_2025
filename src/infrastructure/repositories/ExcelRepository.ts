import { IExcelRepository } from "../../core/interfaces/IExcelRepository";
import { ExcelData } from "../../core/entities/ExcelData";
import { AppDataSource } from "../../config/database";

export class ExcelRepository implements IExcelRepository {
  saveMany(data: ExcelData[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async save(data: ExcelData): Promise<void> {
    const excelDataRepository = AppDataSource.getRepository(ExcelData);
    await excelDataRepository.save(data);
  }
}
