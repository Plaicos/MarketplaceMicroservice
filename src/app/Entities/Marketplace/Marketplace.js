module.exports = class Marketplace {
    constructor(dependencies) {
        let { DAO } = dependencies

        this.entitites = require("./Entities/marketplace_entities")
        this.DAO = DAO
    }

    post({ post_data }) {
        return new Promise(async (resolve, reject) => {
            let { DAO, entitites, credentials, Requester, links } = this

            //validation
            if (!post_data) {
                let erro = {
                    message: "NO POST DATA WAS GIVEN",
                    status: 400
                }
                reject(erro)
                return
            } else if (typeof post_data !== "object") {
                let erro = {
                    message: "POST MUST BE AN OBJECT",
                    status: 400
                }
                reject(erro)
                return
            }

            let post_conditions = [
                post_data.hasOwnProperty("user"),
                post_data.hasOwnProperty("type"),
                typeof post_data.user === "string",
                typeof post_data.type === "string"
            ]
            for (const i of post_conditions) {
                if (i !== true) {
                    let erro = {
                        message: "POST DATA IS INVALID",
                        status: 400
                    }
                    reject(erro)
                    return
                }
            }

            try {
                let post = new entitites.Post({ post: post_data, DAO, credentials, Requester, links })
                post = await post.build()
                await DAO.User.createPost(post)
                //
                resolve("POST CREATED")
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    get_post({ id }) {
        return new Promise(async (resolve, reject) => {
            let { credentials, DAO } = this

            if (!id) {
                let erro = {
                    message: "NO POST ID GIVEN",
                    status: 400
                }
                reject(erro)
                return
            }
            else if (isNaN(parseInt(id, 10))) {
                let erro = {
                    message: "POST ID MUST BE AN INTEGER NUMBER",
                    status: 400
                }
                reject(erro)
                return
            }
            id = parseInt(id, 10)

            try {
                let post = await DAO.User.get_post(id)
                //
                if (post.user !== credentials.user) {
                    let erro = {
                        message: "THIS POST BELONGS TO OTHER USER",
                        status: 401
                    }
                    reject(erro)
                    return
                }
                //
                resolve(post)

            } catch (erro) {
                reject(erro)
            }
        });
    }

    delete_post({ id }) {
        return new Promise(async (resolve, reject) => {
            let clearance = this.clearance
            let Dao = this.Dao

            if (!id) {
                let erro = {
                    message: "NO POST ID GIVEN",
                    status: 400
                }
                reject(erro)
                return
            }
            else if (isNaN(parseInt(id, 10))) {
                let erro = {
                    message: "POST ID MUST BE AN INTEGER NUMBER",
                    status: 400
                }
                reject(erro)
                return
            }
            id = parseInt(id, 10)


            try {
                let post = await this.get_post({ id })
                //
                if (clearance.login !== post.user) {
                    let erro = {
                        message: "THIS POST BELONGS TO OTHER USER",
                        status: 401
                    }
                    reject(erro)
                    return
                }
                //
                await Dao.delete_post(id)
                resolve()

            } catch (erro) {
                reject(erro)
            }
        });
    }

    edit_post({ edit_data }) {
        return new Promise(async (resolve, reject) => {
            let { id, user } = edit_data

            if (!id) {
                let erro = {
                    message: "NO POST ID WAS GIVEN",
                    status: 400
                }
                reject(erro)
                return
            }
            else if (isNaN(parseInt(id))) {
                let erro = {
                    message: "POST ID MUST BE AN INTEGER NUMBER",
                    status: 400
                }
                reject(erro)
                return
            }

            id = parseInt(id, 10)

            try {
                let post = await this.get_post({ id })
                let post_properties = Object.keys(post)
                let edit_properties = Object.keys(edit_data)
                //
                for (let i of edit_properties) {
                    if (post_properties.includes(i)) {
                        post[i] = edit_data[i]
                    }
                }
                //
                post.id = id
                post = {
                    data: post,
                    type: post.type,
                    user: user
                }
                //
                post = new this.entitites.Post({ post_data: post, Dao: this.Dao, clearance: this.clearance })
                await post.build()
                await post.edit()

            } catch (erro) {
                reject(erro)
            }
        });
    }

    //Search Engine
    search({ filters }) {
        return new Promise(async (resolve, reject) => {
            if (filters && typeof filters !== "object") {
                reject("FILTERS MUST BE AN OBJECT")
            }
            let { entitites, dependencies, DAO } = this
            let SearchEngine = new entitites.SearchEngine({ dependencies, DAO })

            try {
                let results = await SearchEngine.search(filters)
                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}