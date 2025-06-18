import fs from 'fs';
import csv from 'csv-parser';

fs.createReadStream('src/folders/delitos_2023.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    console.log('Fila:', row);
  })
  .on('end', () => {
    console.log('Lectura terminada');
  });
