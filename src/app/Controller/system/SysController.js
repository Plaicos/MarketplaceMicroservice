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

    create_credentials() {
        var self = this
        return async function (req, resp) {
            let { dependencies } = self
            let credentials = req.body
            let System = new self.UC.System({ dependencies })
            try {
                await System.create_credentials(credentials)
                resp.status(200).end()
            }
            catch (erro) {
                self.handleError(erro, resp)
            }
        }
    }

    generate_accessToken() {
        var self = this
        return async function (req, resp) {
            let { dependencies } = self
            let data = req.body
            let System = new self.UC.System({ dependencies })
            try {
                let token = await System.generate_accessToken(data)
                resp.status(200)
                resp.json(token)
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

    get_post_types(){
        var self = this
        return async function (req, resp) {
            let { dependencies } = self
            let credentials = req.body
            let System = new self.UC.System({ dependencies })
            try {
                let types = await System.get_post_types()
                resp.status(200)
                resp.json(types)
                resp.end()
            }
            catch (erro) {
                self.handleError(erro, resp)
            }
        }
    }

    grpc_get_post_types(){
        
    }
}