module.exports = class UserInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    get_user(login, credential) {
        return new Promise(async (resolve, reject) => {
            this.Interface.User.get_user()
        })
    }

    check_user(login) {
        this.Interface.check_user({ login }, (erro, statusResponse) => {
            if (erro) {
                return reject(erro)
            }
            if (statusResponse.status === "ok") {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    }
}