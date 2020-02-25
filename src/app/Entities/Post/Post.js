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
                let specific = new Object() // await this[global.type]()
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
                Post = this.methods(Post)
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
            let { title, limited, user, expires, warehouse, product, description } = data
            let global = {}

            try {
                global.user = await entities.user({ user, SCI })
                this.owner = global.user
                global.product = await entities.product({ product, SCI, owner: this.owner })
                global.type = await entities.type({ type: global.product.__proto__.type })
                global.title = await entities.title({ title })
                global.location = await entities.location({ SCI, warehouse, user: global.user })
                global.limited = await entities.limited({ limited })
                global.expires = await entities.expires({ limited, expires })
                global.description = await entities.description({ description })
                global.key_words = global.product.__proto__.key_words

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
                var config = {
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

                if (!credential || typeof credential !== "object") {
                    console.log(Error("CREDENTIAL IS MISSING"))
                    return reject("INTERNAL SERVER ERROR, TRY LATER")
                }

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

                if (!credential || typeof credential !== "object") {
                    console.log(Error("CREDENTIAL IS MISSING"))
                    return reject("INTERNAL SERVER ERROR, TRY LATER")
                }

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
        var { DAO } = this
        return function () {
            return new Promise(async (resolve, reject) => {
                let id = this._id

                try {
                    await DAO.delete_post(id)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    edit() {
        var { DAO, SCI, entities } = this
        return function (changes) {
            return new Promise(async (resolve, reject) => {

                if (!changes || typeof changes !== "object") {
                    return reject("Post changes must be a valid object")
                }

                let id = this._id
                let edit = new Object()

                try {
                    if (changes.title) {
                        this.title = await entities.title({ title: changes.title })
                    }
                    if (Array.isArray(changes.product_id) && changes.product_id.length > 0) {
                        console.log("fooo", changes)
                        this.product = await entities.product({ product_id: changes.product_id, SCI, owner: this.user })
                        this.type = await entities.type({ type: this.product.__proto__.type })
                        this.key_words = this.product.__proto__.key_words
                    }
                    if (changes.description) {
                        this.description = await entities[this.type].description({ description: changes.description })
                    }
                    console.log(this)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
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
                if (Array.isArray(filters.type) && filters.type.length > 0) {
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
                if (filters.key_words) {
                    filter.key_words = await entities.key_words(filters.key_words)
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