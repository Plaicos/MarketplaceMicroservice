module.exports = ({ dependencies, router }) => {
    router = router()
    var userRouter = require("./user/userRouter")
    var systemRouter = require("./system/sysRouter")
    router.use("*", (req, resp, next) => {
        console.log("request from:", req.ip)
        next()
    })
    router.use("/user", userRouter({ dependencies }))
    router.use("/sys", systemRouter({ dependencies }))

    return router
}