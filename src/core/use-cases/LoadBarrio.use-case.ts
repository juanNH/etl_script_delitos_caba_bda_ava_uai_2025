import { BarrioRepository } from '../../infrastructure/repositories/BarrioRepository';
import { ComunaRepository } from '../../infrastructure/repositories/ComunaRepository';
import { Barrio } from '../entities/Barrio.entity';
import { Comuna } from '../entities/Comuna.entity';

export class LoadBarrioUseCase {
    private barrioRepository: BarrioRepository;
    private comunaRepository: ComunaRepository
    private barriosName: string[] = [
        "Agronomia",
        "Almagro",
        "Balvanera",
        "Barracas",
        "Belgrano",
        "Boedo",
        "Caballito",
        "Chacarita",
        "Coghlan",
        "Colegiales",
        "Constitucion",
        "Flores",
        "Floresta",
        "La Boca",
        "La Paternal",
        "Liniers",
        "Mataderos",
        "Monte Castro",
        "Monserrat",
        "Nueva Pompeya",
        "Nuñez",
        "Palermo",
        "Parque Avellaneda",
        "Parque Chacabuco",
        "Parque Chas",
        "Parque Patricios",
        "Puerto Madero",
        "Recoleta",
        "Retiro",
        "Saavedra",
        "San Cristobal",
        "San Nicolas",
        "San Telmo",
        "Velez Sarsfield",
        "Versalles",
        "Villa Crespo",
        "Villa del Parque",
        "Villa Devoto",
        "Villa General Mitre",
        "Villa Lugano",
        "Villa Luro",
        "Villa Ortuzar",
        "Villa Pueyrredon",
        "Villa Real",
        "Villa Riachuelo",
        "Villa Santa Rita",
        "Villa Soldati",
        "Villa Urquiza"
    ]
        ;
    constructor(barrioRepository: BarrioRepository, comunaRepository: ComunaRepository) {
        this.barrioRepository = barrioRepository;
        this.comunaRepository = comunaRepository
    }

    async execute(): Promise<void> {
        const comunas = await this.comunaRepository.getAll();
        const barrios: Barrio[] = this.barriosName.map(barrio => {
            const subTipoEntity = new Barrio()
            subTipoEntity.nombre = barrio
            subTipoEntity.comuna = this.getComuna(barrio, comunas);
            return subTipoEntity;
        })
        await this.barrioRepository.saveMany(barrios)
    }

    private getComuna(name: string, comunas: Comuna[]): Comuna {
        switch (true) {
            case ["Retiro", "San Nicolas", "Puerto Madero", "Monserrat", "San Telmo", "Constitucion"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-1') as Comuna;

            case ["Recoleta"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-2') as Comuna;

            case ["Balvanera", "San Cristobal"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-3') as Comuna;

            case ["La Boca", "Barracas", "Parque Patricios", "Nueva Pompeya"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-4') as Comuna;

            case ["Almagro", "Boedo"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-5') as Comuna;

            case ["Caballito"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-6') as Comuna;

            case ["Flores", "Parque Chacabuco"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-7') as Comuna;

            case ["Villa Soldati", "Villa Riachuelo", "Villa Lugano"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-8') as Comuna;

            case ["Liniers", "Mataderos", "Parque Avellaneda", "Villa Luro"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-9') as Comuna;

            case ["Villa Real", "Monte Castro", "Versalles", "Floresta", "Velez Sarsfield"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-10') as Comuna;

            case [
                "Villa General Mitre",
                "Villa Devoto",
                "Villa del Parque",
                "Villa Santa Rita",
                "Villa Pueyrredon"
            ]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-11') as Comuna;

            case ["Coghlan", "Saavedra", "Villa Urquiza"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-12') as Comuna;

            case ["Belgrano", "Nuñez", "Colegiales"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-13') as Comuna;

            case ["Palermo"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-14') as Comuna;

            case ["Parque Chas", "Villa Ortuzar", "Chacarita", "Villa Crespo", "La Paternal", "Agronomia"]
                .find(b => name.includes(b)) !== undefined:
                return comunas.find(c => c.nombre === 'comuna-15') as Comuna;

            default:
                throw new Error(`No se encontro comuna para el barrio "${name}"`);
        }
    }

}
