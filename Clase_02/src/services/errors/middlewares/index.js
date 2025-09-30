import EErrors from '../errors-enum.js'

export default (error, req, res, next) => {
    console.error("Error detectado - entrando al Error_Handler");
    // console.log("error.Cause: ", error.cause);
    // console.log("error.code: ", error.code);


    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({ status: "error", error: error.cause })
            break;

        default:
            res.status(500).send({ status: "error", error: "Unhandled Error" })
            break;
    }
}