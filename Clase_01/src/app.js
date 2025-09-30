import express from 'express';
import config from './config/config.js';
//Clase de test:
import suma from './suma.js';
//import Routers
import usersRouter from './routers/users.router.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Declare routers:
app.use("/api/users", usersRouter);

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);

    if (config.runTests) {
        let testPasados = 0;
        const testTotales = 4;
        let result

        //Test 1: La función debe devolver null si algun parametro no es numérico.
        result = escenario1()
        if (result) {
            testPasados++
        }

        //Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:
        result = escenario2()
        if (result) {
            testPasados++
        }

        //Test 3: La función debe poder realizar la suma correctamente.
        result = escenario3()
        if (result) {
            testPasados++
        }

        //Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros.
        result = escenario4()
        if (result) {
            testPasados++
        }

        console.log(`Test pasados: ${testPasados}/${testTotales}`);

    }


});


// ESCENARIOS
const escenario1 = () => {
    // descripcion del test
    console.log('Test 1: La función debe devolver null si algun parametro no es numérico.');


    // Given - lo que yo le doy al test para que se ejecute
    const num1 = "HOLA"
    const num2 = 2


    // Then - ejecucion del metodo
    let result = suma(num1, num2)



    // Assert o validaciones
    if (result === null) {
        console.log("Test 1: success!!\n");
        return true;
    } else {
        console.error(`Test 1: No pasado, se recibio ${typeof result} y se esperaba: Null`);
        return false;
    }
}

const escenario2 = () => {
    // descripcion del test
    console.log('Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:');


    // Given - lo que yo le doy al test para que se ejecute
    // const num1 = "HOLA"
    // const num2 = 2


    // Then - ejecucion del metodo
    let result = suma()



    // Assert o validaciones
    if (result === 0) {
        console.log("Test 2: success!!\n");
        return true;
    } else {
        console.error(`Test 2: No pasado, se recibio ${result} y se esperaba: 0`);
        return false;
    }
}


const escenario3 = () => {
    // descripcion del test
    console.log('Test 3: La función debe poder realizar la suma correctamente.');


    // Given - lo que yo le doy al test para que se ejecute
    const num1 = 3
    const num2 = 2


    // Then - ejecucion del metodo
    let result = suma(num1, num2)



    // Assert o validaciones
    if (result === (num1 + num2)) {
        console.log("Test 3: success!!\n");
        return true;
    } else {
        console.error(`Test 3: No pasado, se recibio ${result} y se esperaba: ${num1 + num2}`);
        return false;
    }
}

const escenario4 = () => {
    // descripcion del test
    console.log("Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros");


    // Given - lo que yo le doy al test para que se ejecute
    const numerosEntrada = [1, 2, 3, 4, 5]


    // Then - ejecucion del metodo
    let result = suma(...numerosEntrada)



    // Assert o validaciones
    if (result === 15) {
        console.log("Test 4: success!!\n");
        return true;
    } else {
        console.error(`Test 4: No pasado, se recibio ${result} y se esperaba: ${15}`);
        return false;
    }
}