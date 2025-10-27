import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose'


const expect = chai.expect;
const urlServer = 'http://localhost:8080'
const requester = supertest(urlServer)



describe("Testing Adopme App", () => {


    /*=============================================
    =                   Section 01                =
    =============================================*/
    describe("Testing Pets Api", () => {
        // Test_01
        it("Crear Mascota: El API POST /api/pets debe crear una nueva mascota correctamente", async () => {
            // Given
            const petMock = {
                name: "Patitas",
                specie: "pez",
                birthDate: "10-10-2024"
            }

            // Then
            const { statusCode, _body } = await requester.post("/api/pets").send(petMock)
            // console.log(res);



            // Assert
            expect(statusCode).is.eqls(201)
            expect(_body.payload).is.ok.and.to.have.property("_id")
            expect(_body.payload).to.have.property('adopted').and.to.be.deep.eqls(false)
        })

        // Test_02
        it("Crear Mascota sin nombre: El API POST /api/pets debe retornar un estado HTTP 400 con error.", async () => {

            // Given
            const petMock = {
                // name: "Patitas",
                specie: "perro",
                birthDate: "10-10-2023"
            }

            // Then
            const { statusCode, _body } = await requester.post("/api/pets").send(petMock)
            // console.log(res);



            // Assert
            expect(statusCode).is.eqls(400)
            expect(_body).is.ok.and.to.have.property("error")
            expect(_body).to.have.property('status')
        })

        // Test_03
        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.", async () => {

            // Given
            const petMock = {
                // name: "Patitas",
                specie: "perro",
                birthDate: "10-10-2023"
            }

            // Then
            const { statusCode, _body } = await requester.get("/api/pets")
            // console.log(_body);



            // Assert
            // expect(statusCode).is.eqls(400)
            expect(_body).is.ok.and.to.have.property("status")
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.be.an('array');
        })


        // Test_04
        it("Crear mascota con Avatar (Test con uploads): Debe poder crearse una mascota con la ruta de la imagen.", async () => {
            // Given
            const petMock = {
                name: "Orejitas",
                specie: 'gato',
                birthDate: "10-11-2022"
            }

            //Then
            const result = await requester.post('/api/pets/withimage')
                .field('name', petMock.name)
                .field('specie', petMock.specie)
                .field('birthDate', petMock.birthDate)
                .attach('image', './test/files/coderDog.jpg');


            //Assert
            expect(result.statusCode).to.eqls(200)
            expect(result._body.payload.image).to.be.ok;
        })
    })



    /*=============================================
    =                   Section 02                =
    =============================================*/
    describe('Testing Login and Session with Cookies', () => {

        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: 'Usuareio de prueba 01',
                last_name: 'Apellido de prueba 01',
                email: 'test01@gamil.com',
                password: '123qwe'
            }
        })



        //test_01
        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
            // then
            const { statusCode } = await requester.post('/api/sessions/register').send(this.mockUser)

            //Assert
            expect(statusCode).is.eqls(200)
        })

        //test_02
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
            //given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }

            // then
            const result = await requester.post('/api/sessions/login').send(mockLogin)
            // console.log("Result_Login:::", result);

            // obtenemos info
            const cookieResult = result.headers['set-cookie'][0];
            // console.log('cookieResult -->', cookieResult);


            // hacemos un split
            const cookieData = cookieResult.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            // Assert
            expect(this.cookie.name).to.be.ok.and.eqls('coderCookie')
            expect(this.cookie.value).to.be.ok
        })


        //test_03
        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {


            // tenemos que setar la cookie con su valor en el header
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])



            // Assert
            expect(_body.payload.email).to.be.ok.and.eqls(this.mockUser.email);
        })
    })
})



// //01_ obtenemos info
// const resultCooikie = result.headers['set-cookie'][0] = `coderCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXN1YXJlaW8gZGUgcHJ1ZWJhIDAxIEFwZWxsaWRvIGRlIHBydWViYSAwMSIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0MDFAZ2FtaWwuY29tIiwiaWF0IjoxNzYxNjA2ODE3LCJleHAiOjE3NjE2MTA0MTd9.elTovSrSDaWdcj1PchkV5FD-Is5o_dLqMBT7frrqxBY`


// //02_ hacemos un split


// //03_ guardamos la data en this.cookie
// this.cookie.key = 'coderCookie'
// this.cookie.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXN1YXJlaW8gZGUgcHJ1ZWJhIDAxIEFwZWxsaWRvIGRlIHBydWViYSAwMSIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0MDFAZ2FtaWwuY29tIiwiaWF0IjoxNzYxNjA2ODE3LCJleHAiOjE3NjE2MTA0MTd9.elTovSrSDaWdcj1PchkV5FD-Is5o_dLqMBT7frrqxBY'

