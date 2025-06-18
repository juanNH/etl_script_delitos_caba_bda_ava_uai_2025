import dotenv from "dotenv";
dotenv.config();

export const mssqlConfig = {
    server: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 1433,
    user: process.env.DB_USERNAME || "etluser",
    password: process.env.DB_PASSWORD || "etluser",
    database: process.env.DB_DATABASE || "caba_delitos",
    options: {
        encrypt: false,                // En local no usamos TLS
        trustServerCertificate: true,  // Confiamos en el certificado autofirmado
        enableArithAbort: true,        // Requerido por algunas versiones de SQL
    }
};