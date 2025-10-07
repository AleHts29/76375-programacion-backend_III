import express from 'express';
import calculatorRouter from './routes/calculator.router.js'


const app = express()
const PORT = 9090;

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use('/api/calculator', calculatorRouter)



app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);

})