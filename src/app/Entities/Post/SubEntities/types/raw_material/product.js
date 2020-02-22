module.exports = (dependencies) => {
    return new Promise(async (resolve, reject) => {
        let { product, Requester, credentials, DAO } = dependencies

        if (!Requester) {
            let erro = {
                message: "INTERNAL SERVER ERROR, TRY LATER",
                status: 500
            }
            reject(erro)
            console.log(Error("DAO IS NULL"))
            return
        }

        if (!product) {
            let erro = {
                message: "PRODUCT DATA CANT BE NULL",
                status: 400
            }
            reject(erro)
            return
        }
        else if (typeof product !== "object") {
            let erro = {
                message: "PRODUCT DATA MUST BE AN OBJECT",
                status: 400
            }
            reject(erro)
            return
        }

        let { raw_material } = product

        if (!raw_material) {
            let erro = {
                message: "PRODUCT RAW MATERIAL CANT BE NULL",
                status: 400
            }
            reject(erro)
            return
        }
        else if (typeof raw_material !== "number") {
            let erro = {
                message: "PRODUCT RAW MATERIAL MUST BE AN INTEGER NUMBER",
                status: 400
            }
            reject(erro)
            return
        }

        try {
            let mainServerUrl = Requester.links.main
            let url = `${mainServerUrl}/sys/get/raw-material`
            let config = {
                url: url,
                params: {
                    id: raw_material
                }
            }
            raw_material = await Requester.get(config)
            if (raw_material.user !== credentials.user) {
                let erro = {
                    message: "THIS PRODUCT BELONGS TO OTHER USER",
                    status: 401
                }
                reject(erro)
                return
            }
            //s
            product = raw_material
            resolve(product)
        } 
        catch (erro) {
            reject(erro)
        }
    });
}