module.exports = (dependencies) => {
    return new Promise(async (resolve, reject) => {
        let { user, credentials, DAO } = dependencies

        if (!user) {
            let erro = {
                message: "POST USER DATA CANT BE NULL",
                status: 400
            }
            reject(erro)
            return
        } else if (!credentials) {
            let erro = {
                message: "CREDENTIALS OBJECT IS NULL",
                status: 500
            }
            reject(erro)
            console.log(Error("CLEARANCE OBJECT IS NULL"));
            return
        } else if (!DAO) {
            let erro = {
                message: "INTERNAL SERVER ERROR, TRY LATER",
                status: 500
            }
            reject(erro)
            console.log(Error("DAO OBJECT IS NULL"));
            return
        }
        //
        if (typeof user !== "string") {
            reject("USER MUST BE A STRING")
            return
        }

        try {
            if (credentials.user !== user) {
                let erro = {
                    message: "UNATHORIZED",
                    status: 401
                }
                reject(erro)
                return
            }

            await DAO.System.check_user(user)
            resolve(user)

        } catch (erro) {
            reject(erro)
        }
    });
}