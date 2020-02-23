module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!type || typeof type !== "string") {
            return reject("Post type must be a valid string")
        }
        if (!DAO) {
            reject("INTERNAL SERVER ERROR, TRY LATER")
            console.log(Error("DAO IS MISSING"));
            return
        }

        try {
            if (!await DAO.checkPostType(type)) {
                return reject(`Post type '${type}' does not exist`)
            }
            resolve(type)

        } catch (erro) {
            reject(erro)
        }
    });
}