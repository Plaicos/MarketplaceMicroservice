module.exports = ({ location }) => {
    return new Promise((resolve, reject) => {

        if (!location) {
            resolve(null)
            return
        }
        else if (location && typeof location !== "object") {
            let erro = {
                message: "LOCATION MUST BE AN OBJECT",
                erro: 400
            }
            reject(erro)
            return
        }

        try {
            if (location.state && !location.city) {
                location.state = parseInt(location.state, 10)
                if (isNaN(location.state)) {
                    reject("invalid state location")
                    return
                }
                location = {
                    state: location.state
                }
            }
            else if (location.city && !location.state) {
                location.city = parseInt(location.city, 10)
                if (isNaN(location.city)) {
                    reject("invalid city location")
                    return
                }
                location = {
                    city: location.city
                }
            }
            else if (location.city && location.state) {
                location.state = parseInt(location.state, 10)
                location.city = parseInt(location.city, 10)

                if (isNaN(location.city)) {
                    reject("invalid city location")
                    return
                }
                if (isNaN(location.state)) {
                    reject("invalid state location")
                    return
                }
                location = {
                    city: location.city,
                    state: location.state
                }
            }
            else {
                location = null
            }

            resolve(location)
        }
        catch (erro) {
            reject(erro)
        }
    });
}

