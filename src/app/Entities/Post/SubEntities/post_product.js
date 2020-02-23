module.exports = ({ product, SCI, owner }) => {
    return new Promise(async (resolve, reject) => {

        if (!SCI) {
            console.log(Error("SCI IS NULL"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        if (!product || !Array.isArray(product) || product.length === 0) {
            return reject("Post product_id must be a valid array of IDS")
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
        let products = []
        products.__proto__.type = new Array()

        try {
            for (let id of product) {
                let product = await SCI.Inventory.getProduct(id, simuleted_credential)

                if (!products.__proto__.type.includes(product.type)) {
                    products.__proto__.type.push(product.type)
                }
                
                if (product.user !== owner) {
                    return reject("Cant use another user's product in your post")
                }

                products.push(product._id)
            }
            resolve(products)
        }
        catch (erro) {
            reject(erro)
        }
    });
}