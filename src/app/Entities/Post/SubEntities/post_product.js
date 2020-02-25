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
        let excluded_keywords = ["_id", "type", "user"]
        products.__proto__.type = new Array()
        products.__proto__.key_words = new Object()

        try {
            for (let id of product) {
                let product = await SCI.Inventory.getProduct(id, simuleted_credential)

                if (!products.__proto__.type.includes(product.type)) {
                    products.__proto__.type.push(product.type)
                }

                if (product.user !== owner) {
                    return reject("Cant use another user's product in your post")
                }

                //determines key words 
                for (let i of (Object.keys(product))) {
                    if (!excluded_keywords.includes(i)) {

                        //case the property is a string
                        if (typeof product[i] === "string") {

                            if (Array.isArray(products.__proto__.key_words[i])) {
                                if (!products.__proto__.key_words[i].includes(product[i])) {
                                    products.__proto__.key_words[i].push(product[i])
                                }

                            }
                            else {
                                products.__proto__.key_words[i] = new Array();
                                products.__proto__.key_words[i].push(product[i])
                            }
                        }

                        //case the property is an array of strings
                        if (Array.isArray(product[i])) {

                            for (let _i of product[i]) {

                                if (typeof _i === "string") {

                                    if (Array.isArray(products.__proto__.key_words[i])) {
                                        if (!products.__proto__.key_words[i].includes(_i)) {
                                            products.__proto__.key_words[i].push(_i)
                                        }
                                    }
                                    else {
                                        products.__proto__.key_words[i] = new Array();
                                        products.__proto__.key_words[i].push(_i)
                                    }
                                }
                            }
                        }
                    }
                }
                //
                products.push(product._id)
            }
            
            resolve(products)
        }
        catch (erro) {
            reject(erro)
        }
    });
}