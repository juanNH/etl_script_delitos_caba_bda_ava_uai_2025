import { TipoRepository } from '../../infrastructure/repositories/TipoRepository';
import { Tipo } from '../entities/Tipo.entity';

export class LoadTipoUseCase {
    private tipoRepository: TipoRepository;
    private tiposName: string[] = ['Vialidad', 'Lesiones', 'Amenazas', 'Hurto', 'Robo', 'Homicidios'];

    constructor(tipoRepository: TipoRepository) {
        this.tipoRepository = tipoRepository;
    }

    async execute(): Promise<void> {
        const tipos: Tipo[] = this.tiposName.map(tipo => {
            const tipoEntitiy = new Tipo()
            tipoEntitiy.nombre = tipo
            return tipoEntitiy;
        })
        await this.tipoRepository.saveMany(tipos)
    }
}
