module.exports = class API {
    constructor(dependencies) {
        if (!dependencies) {
            console.log("GRPC API FACTORY ERROR: NO DEPENDENCIES, ABORTING PROCESS...")
            process.abort()
        }

        this.dependencies = dependencies
        this.Controller = require("../../../../../src/app/Controller/Controller.js")
    }

    build() {
        let { dependencies, Controller } = this
        Controller = new Controller(dependencies)

        let api = {
            post: Controller.post(),
            search_posts: Controller.search_posts(),
            edit_post: Controller.edit_post(),
            delete_post: Controller.delete_post(),
            get_post: Controller.get_post(),
            check_post: Controller.check_post()
        }
        return Object.freeze(api)
    }

}