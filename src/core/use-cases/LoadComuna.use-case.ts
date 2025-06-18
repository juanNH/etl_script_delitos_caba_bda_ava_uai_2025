import { ComunaRepository } from '../../infrastructure/repositories/ComunaRepository';
import { Comuna } from '../entities/Comuna.entity';

export class LoadComunaUseCase {
    private comunaRepository: ComunaRepository;
    private tiposName: string[] = [
        'comuna-1',
        'comuna-2',
        'comuna-3',
        'comuna-4',
        'comuna-5',
        'comuna-6',
        'comuna-7',
        'comuna-8',
        'comuna-9',
        'comuna-10',
        'comuna-11',
        'comuna-12',
        'comuna-13',
        'comuna-14',
        'comuna-15'
    ];

    constructor(comunaRepository: ComunaRepository) {
        this.comunaRepository = comunaRepository;
    }

    async execute(): Promise<void> {
        const comunas: Comuna[] = this.tiposName.map(comuna => {
            const tipoEntitiy = new Comuna()
            tipoEntitiy.nombre =comuna
            return tipoEntitiy;
        })
        await this.comunaRepository.saveMany(comunas)
    }
}
