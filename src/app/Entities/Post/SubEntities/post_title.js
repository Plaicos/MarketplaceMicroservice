module.exports = ({ title }) => {
    return new Promise((resolve, reject) => {

        if (!title) {
            let erro = {
                message: "POST TITLE CANT BE NULL",
                status: 400
            }
            reject(erro)
            return
        } else if (typeof title !== "string") {
            let erro = {
                message: "POST TITLE MUST BE A STRING",
                status: 400
            }
            reject(erro)
            return
        }

        let conditions = [
            title.length > 5
        ]

        try {
            for (const i of conditions) {
                if (i !== true) {
                    let erro = {
                        message: "INVALID TITLE",
                        status: 400
                    }
                    reject(erro)
                    return
                }
            }

            resolve(title)

        } catch (erro) {
            reject(erro)
        }
    });
}