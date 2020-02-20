module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!type) {
            let erro = {
                message: "POST TYPE CANT BE NULL",
                status: 400
            }
            reject(erro)
            return
        } else if (typeof type !== "string") {
            let erro = {
                message: "POST TYPE MUST BE A STRING",
                status: 400
            }
            reject(erro)
            return
        } else if (!DAO) {
            let erro = {
                message: "INTERNAL SERVER ERROR",
                status: 500
            }
            reject(erro)
            console.log(Error("DAO IS NULL"));
            return
        }
    
        try {
            let types = await DAO.System.get_post_types()

            if (!types.includes(type)) {
                let erro = {
                    message: "TYPE DOES NOT EXIST",
                    status: 400
                }
                reject(erro)
                return
            }
            resolve(type)

        } catch (erro) {
            reject(erro)
        }
    });
}