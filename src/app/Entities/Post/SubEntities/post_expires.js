module.exports = ({ limited, expires }) => {
    return new Promise((resolve, reject) => {
      
        if (limited && !expires) {
            let erro = {
                message: "LIMITED POST NEEDS EXPIREING DATA",
                status: 400
            }
            reject(erro)
            return
        }
        else if (limited !== true) {
            resolve(null)
            return
        }
        else if (typeof expires !== "object") {
            let erro = {
                message: "LIMITED POST INVALID EXPIREING DATA",
                status: 400
            }
            reject(erro)
            return
        }
        try {

            let conditions = [
                expires.hasOwnProperty("expires_in"),
                //expires.hasOwnProperty("amount_left"),
                !isNaN(parseInt(expires.expires_in)),
                //!isNaN(parseInt(expires.amount_left))
            ]
            for (let i of conditions) {
                if (i !== true) {
                    let erro = {
                        message: "POST INVALID EXPIREING DATA",
                        status: 400
                    }
                    reject(erro)
                    return
                }
            }

            //parses de expire data
            expires.expires_in = parseInt(expires.expires_in, 10)
            //expires.amount_left = parseInt(expires.amount_left, 10)
            //
            resolve(expires)

        } catch (erro) {
            reject(erro)
        }
    });
}