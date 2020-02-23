module.exports = (limited) => {
    return new Promise((resolve, reject) => {
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