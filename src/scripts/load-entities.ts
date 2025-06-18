import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { LoadTipoUseCase } from "../core/use-cases/LoadTipo.use-case";
import { TipoRepository } from "../infrastructure/repositories/TipoRepository";
import { SubTipoRepository } from "../infrastructure/repositories/SubTipoRepository";
import { LoadSubTipoUseCase } from "../core/use-cases/LoadSubTipo.use-case";
import { LoadComunaUseCase } from "../core/use-cases/LoadComuna.use-case";
import { ComunaRepository } from "../infrastructure/repositories/ComunaRepository";
import { LoadBarrioUseCase } from "../core/use-cases/LoadBarrio.use-case";
import { BarrioRepository } from "../infrastructure/repositories/BarrioRepository";

async function createStructure() {
    try {
        await AppDataSource.initialize();
        console.log("Conexión a la base de datos establecida.");
        console.log('Carga de casos de uso...')
        const tipoRepository = new TipoRepository();
        const subTipoRepository = new SubTipoRepository();
        const comunaRepository = new ComunaRepository();
        const barrioRepository = new BarrioRepository();
        const loadTipoUseCase = new LoadTipoUseCase(tipoRepository);
        const loadSubTipoUseCase = new LoadSubTipoUseCase(tipoRepository, subTipoRepository);
        const loadComunaUseCase = new LoadComunaUseCase(comunaRepository);
        const loadBarrioUseCase = new LoadBarrioUseCase(barrioRepository, comunaRepository);

        console.log('Ejecutando casos de uso...');
        await loadTipoUseCase.execute();
        console.log('Carga de tipos exitosa!');
        await loadSubTipoUseCase.execute()
        console.log('Carga de sub tipos exitosa!');
        await loadComunaUseCase.execute()
        console.log('Carga de comunas exitosa!');
        await loadBarrioUseCase.execute()
        console.log('Carga de barrio exitosa!');
        console.log("✅ Estructura cargada correctamente.");
        await AppDataSource.destroy();
        console.log("Conexión cerrada correctamente.");
    } catch (error) {
        console.error("❌ Error cargando la estructura:", error);
        process.exit(1);
    }
}

createStructure();
