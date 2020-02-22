module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            posts: db.collection("post"),
            post_types: db.collection("post_types")
        }
    }

    get_post(id) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.post.find({ _id: ObjectId(id) }).toArray((erro, result) => {
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

    createPost(post) {
        return new Promise(async (resolve, reject) => {
            try {
                let insertionLog = await this.collections.post.insertOne(post)
                //console.log({ insertionLog })
                resolve(insertionLog)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    search(filters) {
        return new Promise((resolve, reject) => {

            function denest(filter, filters) {
                let filter_keys = Object.keys(filter)
                for (let i of filter_keys) {
                    filters[i] = filter[i]
                }
                return filters;
            }

            //parsing data
            let pagination = filters.pagination
            delete filters.pagination

            //denesting nested fields
            if (filters.product) {
                let fields = Object.keys(filters.product)
                for (let i of fields) {
                    filters[`product.${i}`] = filters.product[i]
                }
                delete filters.product
            }
            if (filters.location) {
                let fields = Object.keys(filters.location)
                for (let i of fields) {
                    filters[`location.${i}`] = filters.location[i]
                }
                delete filters.location
            }

            this.collections.post.find(filters).limit(pagination.limit).skip(pagination.offset).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(result)
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

    checkPostType(type) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collections.post_types.find({ type: type }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (result.length > 0) {
                        resolve(true)
                    }
                    else {
                        resolve(false)
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}