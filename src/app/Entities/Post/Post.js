module.exports = class Post {
    constructor({ post, DAO, SCI }) {
        this.data = post
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./SubEntities/postSubEntities")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, entities } = this

            if (!data || typeof data !== "object") {
                reject("Post must be avalid object")
                return
            }

            let post = {}

            try {
                //global fields
                let global = await this.global()
                //type specific fields
                let specific = await this[global.type]()
                // merging
                post = { ...global, ...specific }
                post = this.methods(post)
                console.log(post)
                resolve(post)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    global() {
        return new Promise(async (resolve, reject) => {
            let { data, SCI, DAO, entities } = this
            let { title, type, limited, user, expires } = data
            let global = {}

            try {
                global.title = await entities.title({ title })
                global.type = await entities.type({ type, DAO })
                global.user = await entities.user({ user, SCI })
                global.location = await entities.location({ SCI, user })
                globa.limited = await entities.limited({ limited })
                global.expires = await entities.expires({ limited, expires })

                resolve(global)
            }
            catch (erro) {
                reject(erro)
            }
        })
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

    // __proto__
    methods(post) {
        post.__proto__.validate = this.validate()
        return post;
    }

    validate() {
        var self = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {

            })
        }
    }
}