module.exports = ({ SCI, warehouse, user }) => {
    return new Promise(async (resolve, reject) => {
        if (!SCI) {
            console.log(Error("SCI IS MISSING"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        if (!warehouse || typeof warehouse !== "string") {
            return reject("Post warehouse ID must be a valid ID string")
        }

        try {
            let credential = { user: user, level: 4, scope: { read: true, write: true, third_party: { read: false, write: false } } }
            warehouse = await SCI.User.getUserWarehouse({ id: warehouse, user, credential })
            resolve(warehouse.location)
        }
        catch (erro) {
            reject(erro)
        }
    });
}