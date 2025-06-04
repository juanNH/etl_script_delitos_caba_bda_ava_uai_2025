import { ICsvDelitos } from '../../interfaces/ICsvDelitos.interface';
import { ExcelData } from '../entities/ExcelData';
import { IExcelRepository } from '../interfaces/IExcelRepository';

export class ProcessExcelFile {
  private excelRepository: IExcelRepository;

  constructor(excelRepository: IExcelRepository) {
    this.excelRepository = excelRepository;
  }

  async execute(data: ICsvDelitos[]): Promise<void> {
    console.log(data)
    return
    /* for (const row of data) {
      await this.excelRepository.save(row);
    } */
  }
}
