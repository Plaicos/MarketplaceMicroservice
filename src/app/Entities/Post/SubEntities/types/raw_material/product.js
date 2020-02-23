module.exports = ({ product_id, SCI, owner }) => {
    return new Promise(async (resolve, reject) => {

        if (!SCI) {
            console.log(Error("SCI IS NULL"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        if (!product_id || typeof product_id !== "string") {
            return reject("Post product ID must be a valid ID string")
        }

        let simuleted_credential = {
            user: owner,
            level: 4,
            scope: {
                read: true,
                write: true,
                third_party: {
                    read: false,
                    write: false
                }
            }
        }

        try {
            let product = await SCI.Inventory.getProduct(product_id, simuleted_credential)
            resolve(product)
        }
        catch (erro) {
            reject(erro)
        }
    });
}