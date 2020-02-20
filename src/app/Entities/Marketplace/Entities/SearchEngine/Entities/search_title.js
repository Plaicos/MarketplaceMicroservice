module.exports = ({ title }) => {
    return new Promise((resolve, reject) => {

        if (!title) {
            resolve(null)
            return
        }
        else if (title && typeof title !== "string") {
            reject("Title must be a string")
            return
        }
        //
        if (title.length < 1) {
            reject("Title search must have at least 1 character")
            return
        }

        resolve(title)
    });
}

