import { BarrioRepository } from '../../infrastructure/repositories/BarrioRepository';
import { HechoRepository } from '../../infrastructure/repositories/HechoRepository';
import { SubTipoRepository } from '../../infrastructure/repositories/SubTipoRepository';
import { ICsvDelitos } from '../../interfaces/ICsvDelitos.interface';
import { Barrio } from '../entities/Barrio.entity';
import { Hecho } from '../entities/Hecho.entity';
import { Subtipo } from '../entities/Subtipo.entity';

export class LoadHechoUseCase {
    private hechoRepository: HechoRepository = new HechoRepository();
    private subTipoRepository: SubTipoRepository = new SubTipoRepository();
    private barrioRepository: BarrioRepository = new BarrioRepository();

    constructor() {
    }

    async execute(delitos: ICsvDelitos[]): Promise<void> {
        const subtipos = await this.subTipoRepository.getAll();
        const barrios = await this.barrioRepository.getAll();
        const hechosSinManejar: ICsvDelitos[] = [];
        const hechos: Hecho[] = []
        delitos.forEach(delito => {
            const uso_arma = this.handleUsoArma(delito.uso_arma);
            const uso_moto = this.handleUsoMoto(delito.uso_moto);
            const barrio = this.handleBarrio(barrios, delito.barrio);
            const subTipo = this.handleSubTipo(subtipos, delito.subtipo);
            const fecha = this.handleFecha(delito.fecha);
            if (uso_arma !== undefined && uso_moto !== undefined && barrio && subTipo && fecha) {
                const hecho = new Hecho()
                hecho.id_mapa = delito.id_mapa;
                hecho.uso_arma = uso_arma;
                hecho.uso_moto = uso_moto;
                hecho.latitud = delito.latitud;
                hecho.longitud = delito.longitud;
                hecho.franja = delito.franja;
                hecho.barrio = barrio;
                hecho.subtipo = subTipo;
                hecho.fecha = fecha;
                hechos.push(hecho);
            } else {
                hechosSinManejar.push(delito);
            }
        })
        console.log(`Hechos sin manejar: ${hechosSinManejar.length}`)
        if (hechos.length) {
            hechos.forEach(hecho => {
                if (!hecho.subtipo.id) {
                    console.log(hecho)
                }
            })
            await this.hechoRepository.init()
            await this.hechoRepository.saveBulk(hechos)
            await this.hechoRepository.close()
            console.log(`Hechos creados: ${hechos.length}`)
        } else {
            throw new Error(`No se cargo ningun hecho`);
        }
    }


    private handleUsoArma(usoArma: string): boolean | undefined {
        if (usoArma.toLocaleLowerCase().trim() === 'si') {
            return true;
        } else if (usoArma.toLocaleLowerCase().trim() === 'no') {
            return false;
        } else {
            return undefined;
        }
    }
    private handleUsoMoto(uso_moto: string): boolean | undefined {
        if (uso_moto.toLocaleLowerCase().trim() === 'si') {
            return true;
        } else if (uso_moto.toLocaleLowerCase().trim() === 'no') {
            return false;
        } else {
            return undefined;
        }
    }
    private handleBarrio(barrios: Barrio[], barrioString: string): Barrio | undefined {
        const barrio = barrios.find(barrioItem => {
            const nBarrio = barrioItem.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim()
            const nBarrioS = barrioString.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim()
            if (nBarrio === nBarrioS) {
                return true
            }
            const nameTokens = nBarrio.split(/\s+/);
            const inputTokens = nBarrioS.split(/\s+/);

            if (nameTokens.some(tok => tok === nBarrioS)) return true;
            if (inputTokens.some(tok => tok === nBarrio)) return true;
        });
        return barrio;
    }

    private handleSubTipo(subTipos: Subtipo[], subTipoString: string) {
        const subTipo = subTipos.find(subTipoItem => subTipoItem.nombre.toLocaleLowerCase().trim() === subTipoString.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim());
        return subTipo;
    }
    private handleFecha(fechaString: string) {
        const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

        if (!DATE_REGEX.test(fechaString)) {
            return undefined;
        }

        const fecha = new Date(fechaString);
        if (Number.isNaN(fecha.getTime())) {
            return undefined;
        }

        return fecha;
    }
}
