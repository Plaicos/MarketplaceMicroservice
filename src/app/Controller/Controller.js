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

    edit_post() {
        var self = this
        return async function (call, callback) {
            let { id, changes, credential } = call.request

            try {
                await self.UseCases.edit_post(id, changes, credential)
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

    delete_post() {
        var self = this
        return async function (call, callback) {
            let { id, credential } = call.request

            try {
                await self.UseCases.delete_post(id, credential)
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
                callback(null, results)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_post() {
        var self = this
        return async function (call, callback) {
            let { id, credential } = call.request

            try {
                let post = await self.UseCases.get_post(id, credential)
                callback(null, post)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    check_post() {
        var self = this
        return async function (call, callback) {
            let { id, credential } = call.request

            try {
                await self.UseCases.check_post(id, credential)
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
}