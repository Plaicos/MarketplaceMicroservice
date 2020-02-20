module.exports = class SystemDAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            credentials: this.db.collection("credentials"),
            post_types: this.db.collection("post_types")
        }
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

}