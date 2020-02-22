module.exports = ({ Requester, user }) => {
    return new Promise(async (resolve, reject) => {
        if (!Requester) {
            reject("REQUESTER IN NULL")
            return
        }

        let mainServerUrl = Requester.links.main
        let url = `${mainServerUrl}/sys/get/warehouse`
        let config = {
            url: url,
            params: {
                user: user
            }
        }

        try {
            let location = await Requester.get(config)
            resolve(location)
        }
        catch (erro) {
            reject(erro)
        }
    });
}