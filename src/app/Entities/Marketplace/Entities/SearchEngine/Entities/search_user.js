module.exports = ({ user }) => {
    return new Promise((resolve, reject) => {

        if (!user) {
           resolve(null)
           return
        }
        else if (typeof user !== "string") {
            reject("User must be a string")
            return
        }
        resolve(user)
    });
}

