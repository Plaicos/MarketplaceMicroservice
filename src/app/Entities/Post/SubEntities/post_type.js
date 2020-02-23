module.exports = ({ type }) => {
    return new Promise(async (resolve, reject) => {

        if (!type || !Array.isArray(type)) {
            console.log(Error("TYPE IS MISSING OR NOT AN ARRAY"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }
        resolve(type)
    });
}