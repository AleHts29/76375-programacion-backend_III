import mongoose from "mongoose";
import config from "./config.js";
// import { logger } from './logger_BASE.js';
import { addLogger, logger } from './logger_CUSTOM.js';

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
    };

    static getInstance() {
        if (this.#instance) {
            // console.log("Ya se ha abierto una conexion a MongoDB.");
            logger.warn("Ya se ha abierto una conexion a MongoDB.")
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl);
            // console.log("Conectado con exito a MongoDB usando Moongose.");
            logger.debug("Conectado con exito a MongoDB usando Moongose.")
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    };
};