import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { ICsvDelitos } from '../interfaces/ICsvDelitos.interface';

export class CSVReader {
  // Método para leer el CSV y retornar un array con todas las filas
  static readCSVRows(filePath: string): Promise<ICsvDelitos[]> {
    return new Promise((resolve, reject) => {
      const fullPath = path.resolve(filePath);

      if (!fs.existsSync(fullPath)) {
        console.log("El archivo no existe en la ruta especificada.");
        resolve([]);
        return;
      } else {
        console.log("Leyendo datos de: " + filePath);
      }

      const results: ICsvDelitos[] = [];

      fs.createReadStream(fullPath)
        .pipe(csv({
          separator: ';',
          mapHeaders: ({ header }) =>
            header
              .trim()
              .replace(/-/g, '_')
        }))
        .on('data', (row: ICsvDelitos) => {
          results.push(row);
        })
        .on('end', () => {
          // Cuando termina, devolvemos el array con todas las filas
          resolve(results);
        })
        .on('error', (err) => {
          console.error('Error al leer el archivo:', err);
          reject(err);
        });
    });
  }
}
