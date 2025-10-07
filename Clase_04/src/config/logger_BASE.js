import winston from "winston";


// levels
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6


// Creamos el transport
export const logger = winston.createLogger({
    //transport
    transports: [
        new winston.transports.Console({ level: "debug" }), // <- http, info, warn, error
        new winston.transports.File({ filename: './clase4.log', level: "warn" }), // <- warn, error
    ]
})




// Creamos un middleware de log
export const addLogger = (req, res, next) => {
    req.logger = logger

    req.logger.info(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - ${req.method} en ${req.url}`)

    next()
}