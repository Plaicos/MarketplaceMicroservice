module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {
        
        if (!type) {
            resolve(null)
            return
        }
        else if (type && typeof type !== "string") {
            let erro = {
                message: "TYPE MUST BE A STING",
                erro: 400
            }
            reject(erro)
            return
        }
        try {
            let types = await DAO.System.get_post_types()
            if (!types.includes(type)) {
                reject("TYPE DOES NOT EXIST")
                return
            }
            resolve(type)
        }
        catch (erro) {
            reject(erro)
        }
    });
}

