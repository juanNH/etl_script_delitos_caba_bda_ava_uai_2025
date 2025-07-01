import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { ExcelRepository } from '../infrastructure/repositories/ExcelRepository';
import { ProcessExcelFile } from '../core/use-cases/ProcessExcelFile';
import { CSVReader } from '../utils/ExcelUtilts';
import { ICsvDelitos } from '../interfaces/ICsvDelitos.interface';
import { LoadHechoUseCase } from '../core/use-cases/LoadHecho.use-case';

// Cargar variables de entorno
dotenv.config();

async function main() {
  // Inicializar la conexión a la base de datos
  //await AppDataSource.initialize();
  console.log('Conexión a la base de datos establecida');

  // Cargar el archivo Excel y procesarlo
  const filePaths = ['src/folders/delitos_2020.csv', 'src/folders/delitos_2021.csv', 'src/folders/delitos_2022.csv'];  // Ajusta el path a tu archivo Excel
  for (const path of filePaths) {
    const rows: ICsvDelitos[] = await CSVReader.readCSVRows(path);
    // Procesar los datos y guardarlos en la base de datos
    const tiposUnicos = Array.from(new Set(rows.map(row => row.tipo)));
    const barriosUnicos = Array.from(new Set(rows.map(row => row.barrio)));
    const subtipoUnicos = Array.from(new Set(rows.map(row => row.subtipo)));
    const usoArmaUnicos = Array.from(new Set(rows.map(row => row.uso_arma)));
    const usoMotoUnicos = Array.from(new Set(rows.map(row => row.uso_moto)));
    const comunaUnicos = Array.from(new Set(rows.map(row => row.comuna)));
    console.log('Valores únicos de "tipo":', tiposUnicos);
    console.log('Valores únicos de "barrio":', barriosUnicos);
    console.log('Valores únicos de "subtipo":', subtipoUnicos);
    console.log('Valores únicos de "uso_arma":', usoArmaUnicos);
    console.log('Valores únicos de "uso_moto":', usoMotoUnicos);
    console.log('Valores únicos de "comuna":', comunaUnicos);
    await AppDataSource.initialize();

    const loadHechoUseCase = new LoadHechoUseCase();
    await loadHechoUseCase.execute(rows);
    await AppDataSource.destroy();

    console.log('Datos insertados correctamente en la base de datos');
  }
  process.exit(0);
}

// Ejecutar el script
main().catch((error) => {
  console.error('Error en la ejecución del script:', error);
  process.exit(1);
});
