module.exports = ({ title }) => {
    return new Promise((resolve, reject) => {
        if (!title || typeof title !== "string" || title.length < 5) {
            return reject("Post title must be a valid string of at least 5 characters")
        }
        resolve(title)
    });
}