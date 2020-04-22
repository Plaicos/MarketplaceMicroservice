module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    post_to_marketplace(post_data, credential) {
        return new Promise(async (resolve, reject) => {

            if (!post_data || typeof post_data !== "object") {
                return reject("Post data must be a valid object")
            }

            let { entities, DAO, SCI } = this

            try {
                let Post = await new entities.Post({ post: post_data, DAO, SCI }).build()
                await Post.operate(credential)
                await DAO.registerPost(Post)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    get_post(id, credential) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, SCI } = this

            if (!id || typeof id !== "string") {
                return reject("Post ID must be a valid string")
            }

            try {
                let Post = await new entities.Post({ post: { id }, DAO, SCI }).load()
                //await Post.validate(credential)
                resolve(Post)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    edit_post(id, changes, credential) {
        return new Promise(async (resolve, reject) => {

            let { entities, DAO, SCI } = this

            if (!id || typeof id !== "string") {
                return reject("Post ID must be a valid string")
            }
            if (!changes || typeof changes !== "object") {
                return reject("Post Changes must be a valid object")
            }

            try {
                let Post = await new entities.Post({ post: { id }, DAO, SCI }).load()
                await Post.operate(credential)
                await Post.edit(changes)
                //await DAO.updatePost(id, Post)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    delete_post(id, credential) {
        return new Promise(async (resolve, reject) => {

            let { entities, DAO, SCI } = this

            if (!id || typeof id !== "string") {
                return reject("Post ID must be a valid string")
            }

            try {
                let Post = await new entities.Post({ post: { id }, DAO, SCI }).load()
                await Post.operate(credential)
                await Post.delete()
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    search_marketplace(filters, credential) {
        return new Promise(async (resolve, reject) => {

            if (!filters) {
                return reject("Cant search marketplace with no filters")
            }

            let { DAO, SCI, entities } = this
            let config = {
                level: 4
            }

            try {
                //await this.SCI.Authenticator.checkCredentialClearance(config, credential)
                let results = await new entities.Post({ DAO, SCI }).search(filters)
                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    check_post(id, credential) {
        return new Promise(async (resolve, reject) => {

            let { DAO } = this

            if (!id || typeof id !== "string") {
                return reject("Post ID must be a valid string")
            }

            try {
                if (await DAO.check_post(id)) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
                return
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    async assign_quotation() {
        let { entities, SCI, DAO } = this

        try{

        }
        catch(erro){
            
        }
    }
}