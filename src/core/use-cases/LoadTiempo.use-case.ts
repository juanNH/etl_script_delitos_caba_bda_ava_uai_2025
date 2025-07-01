import { TiempoRepository } from '../../infrastructure/repositories/TiempoRepository';
import { Tiempo } from '../entities/Tiempo.entity';

export class LoadTiempoUseCase {
    private tiempoRepository: TiempoRepository;
    private allDates: string[] = [];
    private diasSemana = [
        "Domingo", "Lunes", "Martes",
        "Miércoles", "Jueves", "Viernes", "Sábado"
    ]
    private nombresMes = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    constructor(tiempoRepository: TiempoRepository) {
        this.tiempoRepository = tiempoRepository;
        this.allDates = this.generateDateRange('2019-01-01', '2025-12-31');
    }

    async execute(): Promise<void> {

        const tiempos: Tiempo[] = this.allDates.map(dateStr => {
            const [yyyy, mm, dd] = dateStr.split("-");
            const month = Number(mm);
            const date = new Date(dateStr);

            const t = new Tiempo();
            t.fechaId = Number(`${yyyy}${mm}${dd}`);
            t.fecha = date;
            // Nombre del día de la semana
            t.dia = this.diasSemana[date.getDay()];
            // Nombre del mes
            t.mes = this.nombresMes[month - 1];
            // Año como texto
            t.anio = yyyy;
            // Trimestre en texto
            if (month <= 3) {
                t.trimestre = "Primer trimestre";
            }
            else if (month <= 6) {
                t.trimestre = "Segundo trimestre";
            }
            else if (month <= 9) {
                t.trimestre = "Tercer trimestre";
            }
            else {
                t.trimestre = "Cuarto trimestre";
            }
            // Cuatrimestre en texto (4 meses por cuatrimestre)
            if (month <= 4) {
                t.cuatrimestre = "Primer cuatrimestre";
            }
            else if (month <= 8) {
                t.cuatrimestre = "Segundo cuatrimestre";
            }
            else {
                t.cuatrimestre = "Tercer cuatrimestre";
            }

            return t;
        });
        await this.tiempoRepository.init()
        await this.tiempoRepository.saveBulk(tiempos)
        await this.tiempoRepository.close()
    }

    private generateDateRange(start: string, end: string) {
        const dates = [];
        let current = new Date(start);

        const endDate = new Date(end);
        while (current <= endDate) {
            const yyyy = current.getFullYear();
            const mm = String(current.getMonth() + 1).padStart(2, '0');
            const dd = String(current.getDate()).padStart(2, '0');
            dates.push(`${yyyy}-${mm}-${dd}`);
            current.setDate(current.getDate() + 1);
        }

        return dates;
    };
}
