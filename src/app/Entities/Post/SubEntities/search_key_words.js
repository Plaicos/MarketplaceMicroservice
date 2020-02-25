module.exports = (key_words) => {
    return new Promise(async (resolve, reject) => {
        if (!key_words || typeof key_words !== "object") {
            return reject("Search key words must be a valid objetc")
        }

        let keys = Object.keys(key_words)

        try {
            for (let key of keys) {
                if (Array.isArray(key_words[key])) {
                    for (let i of key_words[key]) {
                        if (typeof i !== "string" || !i) {
                            return reject(`Search key words error: Key '${i}' inside '${key}' is invalid! All keys must be a valid array of strings`)
                        }
                    }
                }
                else {
                    return reject("Search key words error: All keys must be a valid array of strings")
                }
            }
            resolve(key_words)
        }
        catch (erro) {
            reject(erro)
        }
    })
}