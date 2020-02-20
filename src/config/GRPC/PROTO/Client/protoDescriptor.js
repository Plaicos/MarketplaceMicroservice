var protoLoader = require("@grpc/proto-loader")
var grpc = require("grpc")

//list of services
var services = __dirname + "/Services/services.proto"

//loading services
var packageDefinition = protoLoader.loadSync(services, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

//loading proto descriptor
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

module.exports = protoDescriptor;