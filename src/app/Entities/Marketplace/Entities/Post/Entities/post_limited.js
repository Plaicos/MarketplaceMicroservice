module.exports = (dependencies) => {
    return new Promise((resolve, reject) => {
        let { limited } = dependencies

        try {
            if (limited !== true) {
                limited = false
            }
            resolve(limited)

        } catch (erro) {
            reject(erro)
        }
    });
}