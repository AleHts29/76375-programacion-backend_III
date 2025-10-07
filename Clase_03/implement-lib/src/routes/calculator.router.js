import { Router } from "express";
import calculator from 'lib-calculator';

const router = Router();



router.post("/sum", (req, res) => {
    console.log(req.body);

    const { num1, num2 } = req.body
    const result = calculator.sum(num1, num2)
    res.send({ status: 'success', result: result })
})


router.post("/divide", (req, res) => {
    try {
        const { num1, num2 } = req.body
        const result = calculator.divide(num1, num2)
        res.send({ status: 'success', result: result })
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send({ error: error.message })
    }
})


export default router;