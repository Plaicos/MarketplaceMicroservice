module.exports = {
    port: "0.0.0.0:9999",
    hostname: "Messanger Microservice",
    callback: function (configs) {
        return function () {
            console.log("Marketplace Microservice running at port:", configs.port)
        }
    }
}