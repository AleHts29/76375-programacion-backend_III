import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
//import Routers
//Performance test:
import performanceRouter from './routers/performance-test.router.js';
import sessionRouter from './routers/sessions.router.js'
import userRouter from './routers/users.router.js';


import cluster from 'cluster';
import { cpus } from 'os'


// **BASE
// import { addLogger, logger } from './config/logger_BASE.js';
import { addLogger, logger } from './config/logger_CUSTOM.js';



// // TEST _01
// console.log("Preguntar si es el cluster es primario:");
// if (cluster.isPrimary) {
//     console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
//     console.log("Identificamos el ProcessId Padre: " + process.pid);

//     // si soy el process primary - puedo crear workers
//     cluster.fork() //se utiliza para crear un nuevo proceso hijo (worker)
//     cluster.fork()
//     cluster.fork()
//     cluster.fork()
//     cluster.fork()
// } else {
//     console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
//     console.log("Identificamos el ProcessId Worker: " + process.pid);
// }


// // TEST _02
// console.log("Preguntar si es el cluster es primario:");
// if (cluster.isPrimary) {
//     console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
//     console.log("Identificamos el ProcessId Padre: " + process.pid);

//     // obtenemos el numero de CPUs
//     console.log("numero de Workers a generar: ", cpus().length);



//     for (let index = 0; index < cpus().length - 1; index++) {
//         // si soy el process primary - puedo crear workers
//         cluster.fork() //se utiliza para crear un nuevo proceso hijo (worker)
//     }

// } else {
//     console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
//     console.log("Identificamos el ProcessId Worker: " + process.pid);
// }






// TEST _03
console.log("Preguntar si es el cluster es primario:");
if (cluster.isPrimary) {
    console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
    console.log("Identificamos el ProcessId Padre: " + process.pid);

    // obtenemos el numero de CPUs
    console.log("numero de Workers a generar: ", cpus().length);



    for (let index = 0; index < cpus().length - 1; index++) {
        // si soy el process primary - puedo crear workers
        cluster.fork() //se utiliza para crear un nuevo proceso hijo (worker)
    }


    // Listener para manejar la muerte de los Workers
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);

        cluster.fork()
    })

} else {
    console.log("Soy el proceso Primario/Padre? - ", cluster.isPrimary);
    console.log("Identificamos el ProcessId Worker: " + process.pid);



    const app = express();

    //JSON settings:
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // **activacion de logger middleware
    app.use(addLogger)




    //Declare routers:
    app.use("/api/performance", performanceRouter);
    app.use("/api/session", sessionRouter);
    app.use("/api/user", userRouter);

    // **BASE
    app.get("/testLogger", (req, res) => {
        logger.fatal("EndPoint de prueba de sistema de Logger")
        res.send("Test Logger")
    })

    const SERVER_PORT = config.port;
    app.listen(SERVER_PORT, () => {
        // console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
        logger.info("Servidor escuchando por el puerto: " + SERVER_PORT)
    });
}


const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};
mongoInstance();










