module.exports = class SearchEngine {
    constructor({ dependencies, DAO }) {
        let { UC } = dependencies

        this.dependencies = dependencies
        this.DAO = DAO
        this.UC = UC
        this.entities = require("./Entities/SearchEntities")
    }

    search(filters) {
        return new Promise(async (resolve, reject) => {
            let { DAO, entities } = this
            let { type, location, limited, title, product, pagination, user } = filters

            function remove_empity(filters) {
                let filter_keys = Object.keys(filters)
                for (let i of filter_keys) {
                    if (!filters[i]) {
                        delete filters[i]
                    }
                }
                return filters
            }

            try {
                filters = {
                    type: await entities.type({ type, DAO }),
                    limited: await entities.limited({ limited }),
                    title: await entities.title({ title }),
                    user: await entities.user({ user }),
                    pagination: await entities.pagination({ pagination }),
                    //nested stuff
                    location: await entities.location({ location }),
                    product: await entities.product({ product })
                }
                //
                filters = remove_empity(filters)
                //
                let results = await DAO.User.search(filters)
                resolve(results)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}