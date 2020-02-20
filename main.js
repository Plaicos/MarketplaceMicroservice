async function initialize() {
    //-------- importação de modulos customizados
    var { grpcInit } = require("./src/config/GRPC/GRPC")

    //dependencies
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()

    //opening server
    grpcInit(dependencies)

    let token = await dependencies.SCI.Authenticator.generateToken("Caroline")
    console.log({ token })
}

initialize()