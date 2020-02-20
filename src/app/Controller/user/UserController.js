module.exports = class {
    constructor({ dependencies }) {
        this.UC = {
            User: require("../../Use_Cases/user/UserUseCases"),
            System: require("../../Use_Cases/system/SystemUseCases")
        }
        dependencies.UC = {
            User: require("../../Use_Cases/user/UserUseCases"),
            System: require("../../Use_Cases/system/SystemUseCases")
        }
        this.dependencies = dependencies
    }

    post_to_marketplace() {
        var self = this
        return async function (req, resp) {
            let { dependencies } = self
            let credentials = req.credentials
            let post_data = req.body
            let User = new self.UC.User({ dependencies, credentials })

            try {
                await User.post_to_marketplace(post_data)
                resp.status(200).end()
            }
            catch (erro) {
                self.handleError(erro, resp)
            }
        }
    }

    search_marketplace() {
        var self = this
        return async function (req, resp) {
            let { dependencies } = self
            let credentials = req.credentials
            let filters = req.body
            let User = new self.UC.User({ dependencies, credentials })

            try {
                let searchResult = await User.search_marketplace(filters)
                resp.status(200)
                resp.json(searchResult)
                resp.end()
            }
            catch (erro) {
                self.handleError(erro, resp)
            }
        }
    }

    handleError(error, resp) {
        if (error && error.status) {
            resp.status(error.status)
        }
        else {
            resp.status(500)
        }
        console.log(error)
        resp.json(error)
        resp.end()
    }

}