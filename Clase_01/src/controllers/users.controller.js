import { generateUser } from '../utils.js'

export const getUsers = async (req, res) => {
    try {
        // const totalUserGenerated = req.query.cant
        const { cant } = req.params;
        let totalUserGenerated = 0

        console.log(cant);

        if (!cant) {
            totalUserGenerated = 10
        } else {
            totalUserGenerated = cant
        }
        let users = [];

        for (let i = 0; i < totalUserGenerated; i++) {
            users.push(generateUser());
        }

        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios:" });
    }
};