module.exports = ({ user, SCI }) => {
    return new Promise(async (resolve, reject) => {
        if (!user || typeof user !== "string") {
            return reject("Post user must be a valis string")
        }
        if (!SCI) {
            reject("INTERNAL SERVER ERROR, TRY LATER")
            console.log(Error("SCI IS MISSING"));
            return
        }

        try {
            if (!await SCI.User.check_user(user)) {
                return reject(`User '${user}' does not exist`)
            }
            resolve(user)

        } catch (erro) {
            reject(erro)
        }
    });
}