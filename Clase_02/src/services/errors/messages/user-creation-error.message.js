export const generateUserErrorInfoSp = (user) => {
    return `Una o mas propiedades fueron enviadas incompletas o no son validas.

    Lista de propiedades requeridas:
        -> first_name: type String, recibido: "${user.first_name}"
        -> email: type String, recibido: "${user.email}"
`
}

export const generateUserErrorInfoEn = (user) => {
    return `One or more properties were sent incomplete or are not valid.

    List of required properties:
        -> first_name: type String, received ${user.first_name}
        -> email: type String, received ${user.email}
`
}

export const generateUserErrorInfoPt = (user) => {
    return `Uma ou mais propriedades foram enviadas incompletas ou não são válidas.

    Lista de propriedades obrigatórias:
        -> first_name: tipo String, recebido ${user.first_name}
        -> email: tipo String, recebido ${user.email}
`
}