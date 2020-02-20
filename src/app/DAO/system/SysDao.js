class SysDao {
    constructor({ dependencies }) {
        this.db = dependencies.db
        this.collections = {
            credentials: this.db.collection("credentials"),
            post_types: this.db.collection("post_types")
        }
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

    get_post_types() {
        return new Promise((resolve, reject) => {
            this.collections.post_types.find({}).project({ _id: 0 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                let parsed = []
                for (let i of result) {
                    parsed.push(i.type)
                }
                console.log(parsed)
                resolve(parsed)
            })
        });
    }

    check_user(user) {
        return new Promise((resolve, reject) => {
            this.collections.credentials.find({ user: user }).toArray((erro, result) => {
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

    create_credentials(credentials) {
        return new Promise(async (resolve, reject) => {
            try {
                let insertionLog = await this.collections.credentials.insertOne(credentials)
                //console.log({ insertionLog })
                resolve(insertionLog)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}

module.exports = SysDao;