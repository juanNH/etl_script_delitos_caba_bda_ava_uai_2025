import { SubTipoRepository } from '../../infrastructure/repositories/SubTipoRepository';
import { TipoRepository } from '../../infrastructure/repositories/TipoRepository';
import { Subtipo } from '../entities/Subtipo.entity';
import { Tipo } from '../entities/Tipo.entity';

export class LoadSubTipoUseCase {
    private tipoRepository: TipoRepository;
    private subTipoRepository: SubTipoRepository
    private subTiposName: string[] = [
        'Muertes por siniestros viales',
        'Lesiones por siniestros viales',
        'Lesiones Dolosas',
        'Amenazas',
        'Hurto total',
        'Robo total',
        'Hurto automotor',
        'Robo automotor',
        'Homicidio Doloso'
    ];
    constructor(tipoRepository: TipoRepository, subTipoRepository: SubTipoRepository) {
        this.tipoRepository = tipoRepository;
        this.subTipoRepository = subTipoRepository
    }

    async execute(): Promise<void> {
        const tipos = await this.tipoRepository.getAll();
        const subTipos: Subtipo[] = this.subTiposName.map(subTipo => {
            const subTipoEntity = new Subtipo()
            subTipoEntity.nombre = subTipo
            subTipoEntity.tipo = this.getTipeOfSubTipe(subTipo, tipos);
            return subTipoEntity;
        })
        await this.subTipoRepository.saveMany(subTipos)
    }

    private getTipeOfSubTipe(name: string, tipos: Tipo[]): Tipo {
        switch (name) {
            case 'Muertes por siniestros viales':
                return tipos.find(tipo => tipo.nombre === 'Vialidad') as Tipo

            case 'Lesiones por siniestros viales':
                return tipos.find(tipo => tipo.nombre === 'Vialidad') as Tipo

            case 'Lesiones Dolosas':
                return tipos.find(tipo => tipo.nombre === 'Lesiones') as Tipo

            case 'Amenazas':
                return tipos.find(tipo => tipo.nombre === 'Amenazas') as Tipo

            case 'Hurto total':
                return tipos.find(tipo => tipo.nombre === 'Hurto') as Tipo

            case 'Robo total':
                return tipos.find(tipo => tipo.nombre === 'Robo') as Tipo

            case 'Hurto automotor':
                return tipos.find(tipo => tipo.nombre === 'Hurto') as Tipo

            case 'Robo automotor':
                return tipos.find(tipo => tipo.nombre === 'Robo') as Tipo

            case 'Homicidio Doloso':
                return tipos.find(tipo => tipo.nombre === 'Homicidios') as Tipo
            default:
                return new Tipo();
        }
    }
}
