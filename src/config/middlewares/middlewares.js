module.exports = ({ dependencies, router }) => {
    router = router()
    //tools
    let Authenticator = new (require("../../app/tools/auth/authenticator"))(dependencies)

    router.use("*", async (req, resp, next) => {
        let token = ""

        if (req.cookies && req.cookies["Plaicos Marketplace Cookie"]) {
            token = req.cookies["Plaicos Marketplace Cookie"]
        }
        else if (req.query.token) {
            token = req.query.token
        }

        try {
            req.credentials = await Authenticator.authorize_accessToken(token)
            console.log("user authenticated:", req.credentials)
        }
        catch (erro) {
            resp.status(401)
            resp.json(erro)
            resp.end()
        }
        next()
    })

    router.use("*", async (req, resp, next) => {
        // ????
        
        next()
    })

    return router;
}