class SysDao {
    constructor({ dependencies }) {
        this.db = dependencies.db
        this.collections = {
            credentials: this.db.collection("credentials"),
            post: this.db.collection("post")
        }
        this.ObjectId = dependencies.ObjectId
    }

    get_credentials(user) {
        return new Promise((resolve, reject) => {
            this.collections.credentials.find({ user: user }).project({ _id: 0 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(result[0])
                }
                else {
                    resolve(null)
                }
            })
        });
    }

    

}

module.exports = SysDao;