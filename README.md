# ETL Script Delitos CABA

Este repositorio contiene un **script ETL** en TypeScript que:

1. Lee un CSV de delitos de la Ciudad Autónoma de Buenos Aires.
2. Aplica validaciones y normalizaciones.
3. Persiste los datos en SQL Server usando TypeORM y bulk insert nativo.

---

## 📦 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js v16+** y **npm** o **yarn**
2. **TypeScript** (incluido en `devDependencies`)
3. Una instancia de **SQL Server** (Express o Developer) corriendo localmente
4. SQL Server configurado en **Mixed Mode** (SQL Server y Windows Authentication)

---

## 🔧 Instalación y configuración inicial

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/etl-script-delitos-caba.git
   cd etl-script-delitos-caba
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o con yarn:
   yarn install
   ```

3. **Crear** un archivo `.env` en la raíz, copiando `.env.example`:
   ```bash
   DB_HOST=localhost
   DB_PORT=1433
   DB_USERNAME=etluser
   DB_PASSWORD=etluser
   DB_DATABASE=caba_delitos
   ```

## ⚙️ Scripts disponibles

En `package.json` encontrarás estos comandos:

| Script                | Descripción                                      |
| --------------------- | ------------------------------------------------ |
| `npm run create:db`   | Inicializa TypeORM y sincroniza el esquema DB    |
| `npm run load:db`  | Carga datos de las tablas auxiliares`        |
| `npm run start`| Carga los datos de los csv              |

**Ejemplo de flujo completo**:
```bash
npm run create:db
npm run load:db
npm run start
```
## 📁 Estructura del proyecto

```text
├── src
│   ├── config
│   │   └── database.ts        # Configuración de TypeORM
│   ├── core
│   │   ├── entities           # Entidades: Comuna, Barrio, Tipo, Subtipo, Hecho
│   │   ├── interfaces         # Interfaces de repositorio
│   │   └── use-cases          # Casos de uso
│   ├── infrastructure
│   │   └── repositories       # Implementaciones de repositorios
│   ├── scripts                # Scripts: create-structure, load-tipos, load-hechos
│   ├── utils                  # Helpers: CSV parser, normalización
│   └── folders                # CSVs de entrada
├── .env.example
├── README.md
├── tsconfig.json
└── package.json
```
## 🚀 Paso a paso de uso


1. Verificar que los archivos CSV estén en `src/folders/`.
2. Declara el _path_ en la variable _filePaths_ 
3. Ejecutar en orden:
```bash
   npm run create:db    # Crea esquema en la DB
   npm run load:db   # Inserta datos
   npm run start # Inserta datos de los csv
```
4. Abrir SSMS y comprobar registros en las tablas.