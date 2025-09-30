export default class CustomError {
    // Metodo statico
    static createError({ name = "Error", cause, message, code = 0 }) {
        const error = new Error(message)
        error.name = name;
        error.code = code;
        error.cause = cause;


        throw error;
    }
}