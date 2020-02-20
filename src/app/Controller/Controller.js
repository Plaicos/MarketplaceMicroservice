module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../Use_Cases/UseCases"))(dependencies)
    }
    post() {
        var self = this
        return async function (call, callback) {
            let { UseCases } = self
            let post = call.request

            try {
                
            }
            catch (erro) {

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