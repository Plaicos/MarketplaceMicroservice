module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    get_post_types() {
        return new Promise(async (resolve, reject) => {
            let { DAO } = this

            try {
                let types = await DAO.get_post_types()
                resolve(types)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    post_to_marketplace(post_data, credential) {
        return new Promise(async (resolve, reject) => {

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

    edit_post(id, changes, credential) {
        return new Promise(async (resolve, reject) => {

        })
    }

    delete_post(id, credential) {
        return new Promise(async (resolve, reject) => {

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
                await this.SCI.Authenticator.checkCredentialClearance(config, credential)
                let results = await new entities.Post({ DAO, SCI }).search(filters)
                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}