import { Tipo } from '../entities/Tipo.entity';
import { ITipoRepository } from '../interfaces/ITipoRepository';

export class LoadTipoUseCase {
    private tipoRepository: ITipoRepository;
    private tiposName: string[] = ['Vialidad', 'Lesiones', 'Amenazas', 'Hurto', 'Robo', 'Homicidios'];

    constructor(tipoRepository: ITipoRepository) {
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
