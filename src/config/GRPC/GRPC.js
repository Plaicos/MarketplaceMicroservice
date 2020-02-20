//GRPC and services config
var grpc = require("grpc")
var Marketplace = require("./PROTO/Server/protoDescriptor").Marketplace
var server_credentials = require("./Credentials/GRPC_Server_Credentials")
var services_credentials = require("./Credentials/Services/credentials")
var ServicesProtoDescriptor = require("./PROTO/Client/protoDescriptor")
var services_addresses = require("./services_adresses")

//server configs
var server_config = require("../server/server_config")

//creating server instance
var server = new grpc.Server()

function grpcInit(dependencies) {
    //importing Controller constructor
    var Controller = new (require("../../app/Controller/Controller"))(dependencies)
    //
    server.addService(Marketplace.service, {
        post: Controller.post(),
        get_post_types: Controller.get_post_types()
    })
    server.bind(server_config.port, server_credentials)
    server.start()
    console.log(`Marketplace GRPC Server running on port ${server_config.port}`)
}

// clients
var Client = {
    Authenticator: new ServicesProtoDescriptor.Authenticator(services_addresses.auth, services_credentials.authenticator)
}

module.exports = {
    grpcInit,
    Client
}