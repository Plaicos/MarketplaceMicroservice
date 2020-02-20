module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO } = dependencies

        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    get_post_types() {
        return new Promise(async (resolve, reject) => {
            let { DAO } = this

            try {
                let types = await DAO.System.get_post_types()
                resolve(types)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    post_to_marketplace(post_data, token) {
        return new Promise(async (resolve, reject) => {
            let { entities } = this
            let Marketplace = new entities.Marketplace({ dependencies, credentials })

            try {
                await Marketplace.post({ post_data })
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    search_marketplace(filters) {
        return new Promise(async (resolve, reject) => {
            if (!filters) {
                return reject("Cant search marketplace with no filters")
            }
            let { dependencies, credentials, entities } = this
            let Marketplace = new entities.Marketplace({ dependencies, credentials })

            try {
                let results = await Marketplace.search({ filters })
                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }
}