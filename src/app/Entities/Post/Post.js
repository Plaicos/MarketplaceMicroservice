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
                resolve(post)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO } = this

            if (!data || typeof data !== "object") {
                return reject("Post data must be a valid object")
            }

            let { id } = data

            try {
                let Post = await DAO.get_post(id)
                resolve(Post)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    global() {
        return new Promise(async (resolve, reject) => {
            let { data, SCI, DAO, entities } = this
            let { title, type, limited, user, expires, warehouse_id } = data
            let global = {}

            try {
                global.title = await entities.title({ title })
                global.type = await entities.type({ type, DAO })
                global.user = await entities.user({ user, SCI })
                global.location = await entities.location({ SCI, warehouse_id, user: global.user })
                global.limited = await entities.limited({ limited })
                global.expires = await entities.expires({ limited, expires })
                this.owner = global.user
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
            let { data, owner, SCI } = this
            let { product_id, description } = data
            let entities = this.entities.raw_material
            let specific = new Object()

            try {
                specific.product = await entities.product({ product_id, SCI, owner })
                specific.description = await entities.description({ description })
                //
                resolve(specific)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    // __proto__
    methods(post) {
        post.__proto__.validate = this.validate()
        post.__proto__.operate = this.operate()
        post.__proto__.edit = this.edit()
        post.__proto__.delete = this.delete()
        return post;
    }

    validate() {
        var { SCI } = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {
                let owner = this.user

            })
        }
    }

    operate() {
        var { SCI } = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {

                let owner = this.user
                let config = new Object({
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
                })

                try {
                    await SCI.Authenticator.checkCredentialClearance(config, credential)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    delete() {
        return function () {
            return new Promise(async (resolve, reject) => {

            })
        }
    }

    edit() {
        var { DAO, entities } = this
        return function (changes) {
            return new Promise(async (resolve, reject) => {

                if (!changes || typeof changes !== "object") {
                    return reject("Post changes must be a valid object")
                }

                let id = this._id
                let edit = new Object()

                try {
                    if (changes.title) {
                        edit.title = await entities.title({ title })
                    }
                    if (changes.description) {
                        edit.description = await entities[this.type].description({ description })
                    }
                    console.log({ edit })
                }
                catch (erro) {

                }
            })
        }
    }

    search(filters) {
        let { SCI, DAO, entities } = this
        return new Promise(async (resolve, reject) => {

            if (!filters || typeof filters !== "object") {
                return reject("Cant search posts with no filters")
            }

            let { title, type, user, location, limited, expires, product, limit, offset } = filters
            let filter = new Object()

            try {
                if (filters.title) {
                    filter.title = await entities.title({ title })
                }
                if (filters.type) {
                    filter.type = await entities.type({ type, DAO })
                }
                if (filters.user) {
                    filter.user = await entities.user({ user, SCI })
                }
                if (filters.location) {
                    //filter.location = await entities.location({})
                }
                if (filters.limited) {

                }
                if (filters.expires) {

                }
                if (filters.product) {
                    filter.product = filters.product
                }
                filter.limit = await entities.limit(limit)
                filter.offset = await entities.offset(offset)

                let results = await DAO.searchPosts(filter)

                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        })

    }
}
