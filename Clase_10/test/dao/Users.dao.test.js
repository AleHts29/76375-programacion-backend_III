import mongoose from "mongoose";
import UsersDao from '../../src/dao/Users.dao.js';
import Assert from 'assert';


// Creamos una conexion a la DB
mongoose.connect(`mongodb://localhost:27017/clase40-adoptme-test?retryWrites=true&w=majority`)

const assert = Assert.strict


describe('Testing Modulo User DAO', () => {
    // before()
    // beforeEach()
    before(function () {
        this.usersDao = new UsersDao()
    })

    beforeEach(function () {
        this.timeout(5000) // time de espera ya que estamos usando una DB
        mongoose.connection.collections.users.drop()
    })

    // Los it() son los sub-test que pertenecen al describe()
    // it()
    // it()

    it('El dao debe devolver los usuarios en formato de arreglo.', async function () {
        // Given
        // console.log(this.usersDao);
        const isArray = true


        // Then
        const result = await this.usersDao.get()
        // console.log("Resultado de la consulta: ", result);


        //Assert that
        assert.strictEqual(Array.isArray(result), isArray)
    })

    it('El Dao debe agregar el usuario correctamente a la BD.', async function () {
        // Given
        const mockUser = {
            first_name: 'Nombre de prueba 01',
            last_name: 'Apellido de prueba 01',
            email: "prueba01@gmail.com",
            password: "123qwe"
        }

        // Then
        const result = await this.usersDao.save(mockUser)
        // console.log("Result: ", result);

        //Assert that
        assert.ok(result._id)
    })

    it('El Dao debe agregar al documento insertado un arreglo de mascotas vacio.', async function () {
        // Given
        const mockUser = {
            first_name: 'Nombre de prueba 02',
            last_name: 'Apellido de prueba 02',
            email: "prueba02@gmail.com",
            password: "123qwe"
        }

        // Then
        const result = await this.usersDao.save(mockUser)
        // console.log("Result: ", result);

        //Assert that
        assert.deepStrictEqual(result.pets, [])
    })


    //after()
    //afterEach()
})

