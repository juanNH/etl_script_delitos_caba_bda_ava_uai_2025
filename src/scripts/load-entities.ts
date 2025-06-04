import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { LoadTipoUseCase } from "../core/use-cases/LoadTipo.use-case";
import { TipoRepository } from "../infrastructure/repositories/TipoRepository";
import { SubTipoRepository } from "../infrastructure/repositories/SubTipoRepository";
import { LoadSubTipoUseCase } from "../core/use-cases/LoadSubTipo.use-case";

async function createStructure() {
    try {
        await AppDataSource.initialize();
        console.log("Conexión a la base de datos establecida.");
        console.log('Carga de casos de uso...')
        const tipoRepository = new TipoRepository();
        const subTipoRepository = new SubTipoRepository();
        const loadTipoUseCase = new LoadTipoUseCase(tipoRepository);
        const loadSubTipoUseCase = new LoadSubTipoUseCase(tipoRepository, subTipoRepository);

        console.log('Ejecutando casos de uso...');
        //await loadTipoUseCase.execute();
        console.log('Carga de tipos exitosa!');
        await loadSubTipoUseCase.execute()
        console.log('Carga de sub tipos exitosa!');

        console.log("✅ Estructura cargada correctamente.");

        await AppDataSource.destroy();
        console.log("Conexión cerrada correctamente.");
    } catch (error) {
        console.error("❌ Error cargando la estructura:", error);
        process.exit(1);
    }
}

createStructure();
