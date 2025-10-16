import winston from "winston";
import config from "./config.js";

// levels
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6



//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'magenta'
    }
};
// *orange no existe, estos son los disponibles: Font foreground colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`,`cyan`, `white`, `gray`, `grey`.
winston.addColors(customLevelsOptions.colors)




/* =====================================
=            TrasnPorts                =
===================================== */
// devTransport
const devLogger = winston.createLogger({
    //Levels
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File(
            {
                filename: "./clase4.log",
                level: "warning",
                format: winston.format.simple()
            }
        )
    ]
})


// prodTransport
const prodLogger = winston.createLogger({
    //Levels
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" }), // <- http, info, warn, error
        new winston.transports.File({ filename: './clase4.log', level: "warning" }), // <- warn, error
    ]
})


export const logger = config.environment === "production" ? prodLogger : devLogger
logger.info(`Logger Mode: ${config.environment === "production" ? "Prod" : "Dev"}`)

// Creamos un middleware de log
export const addLogger = (req, res, next) => {
    if (config.environment === 'production') {
        req.logger = prodLogger;
        req.logger.http(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - ${req.method} en ${req.url}`)
    } else {
        req.logger = devLogger;
        req.logger.http(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - ${req.method} en ${req.url}`)
    }
    next()
}