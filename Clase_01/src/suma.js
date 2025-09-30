

// export default (num1, num2) => {


//     if (!num1 || !num2) return 0

//     //Test 1: La función debe devolver null si algun parametro no es numérico.
//     if (typeof num1 != "number" || typeof num2 != "number") return null


//     return num1 + num2
// }


// export default (...numbers) => {
//     if (numbers.length === 0) return 0

//     for (let i = 0; i < numbers.length; i++) {
//         if (typeof numbers[i] != "number") return null
//     }


//     let result = 0
//     for (let i = 0; i < numbers.length; i++) {
//         result += numbers[i];
//     }

//     return result;
// }

// REFACTOR
export default (...numbers) => {
    console.log("numbers: ", numbers);

    if (numbers.length === 0) return 0;

    if (!numbers.every(num => typeof num === "number")) return null;

    let result = 0;
    result = numbers.reduce((prev, current) => prev + current);

    return result;
};