module.exports = ({ SCI, warehouse_id, user }) => {
    return new Promise(async (resolve, reject) => {
        if (!SCI) {
            console.log(Error("SCI IS MISSING"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        if (!warehouse_id || typeof warehouse_id !== "string") {
            return reject("Post warehouse ID must be a valid ID string")
        }

        try {
            let credential = { user: user, level: 4, scope: { read: true, write: true, third_party: { read: false, write: false } } }
            let warehouse = await SCI.User.getUserWarehouse({ id: warehouse_id, user, credential })
            resolve(warehouse.location)
        }
        catch (erro) {
            reject(erro)
        }
    });
}