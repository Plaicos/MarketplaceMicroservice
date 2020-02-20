var grpc = require("grpc")
var credential = grpc.credentials.createInsecure()

module.exports = credential;