module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../Use_Cases/UseCases"))(dependencies)
    }

    handleError(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }

    post() {
        var self = this
        return async function (call, callback) {
            let { post, credential } = call.request

            try {
                await self.UseCases.post_to_marketplace(post, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    search_posts() {
        var self = this
        return async function (call, callback) {
            let { filters, credential } = call.request

            try {
                let results = {
                    results: await self.UseCases.search_marketplace(filters, credential)
                }
                console.log(results.results)
                callback(null, results)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_post_types() {
        var self = this
        return async function (call, callback) {
            let { UseCases } = self

            try {
                let postTypes = {
                    types: await UseCases.get_post_types()
                }
                callback(null, postTypes)
            }
            catch (erro) {
                console.log(erro)
            }
        }
    }

}