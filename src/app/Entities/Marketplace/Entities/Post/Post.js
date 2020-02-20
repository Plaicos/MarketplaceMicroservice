module.exports = class PostFactory {
    constructor({ post, credentials, DAO, Requester, links }) {
        this.data = post
        this.credentials = credentials
        this.DAO = DAO
        this.entities = require("./Entities/post_entities")
        this.Requester = Requester
        this.Requester.links = links
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, credentials, DAO, entities, Requester } = this

            if (!DAO) {
                reject("DAO IS NULL")
                return
            }
            else if (!credentials) {
                reject("NO CREDENTIALS, CANT BUILD POST")
                return
            }
            else if (!data) {
                reject("NO POST DATA GIVEN, CANT BUILD POST")
                return
            }
            //
            if (typeof data !== "object") {
                reject("POST MUST BE AN OBJECT")
                return
            }

            try {
                let { type, user, limited, expires, title } = data

                //global fields
                let global = {
                    title: await entities.title({ title }),
                    type: await entities.type({ type, DAO }),
                    user: await entities.user({ user, credentials, DAO }),
                    location: await entities.location({ Requester, user }),
                    limited: await entities.limited({ limited }),
                    expires: await entities.expires({ limited, expires })
                }

                //type specific fields
                let specific = await this[global.type]()
                // merging
                data = { ...global, ...specific }
                console.log(data, specific, global)
                resolve(data)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    // type specific buisness logic

    raw_material() {
        return new Promise(async (resolve, reject) => {
            let { data, Requester, credentials } = this
            let { product, description } = data
            let entities = this.entities.raw_material

            try {
                data = {
                    product: await entities.product({ product, Requester, credentials }),
                    description: await entities.description({ description })
                }
                //
                resolve(data)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    mix() {

    }

    packing() {

    }

}