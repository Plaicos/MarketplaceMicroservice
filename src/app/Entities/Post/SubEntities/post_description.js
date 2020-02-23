module.exports = ({ description }) => {
    return new Promise(async (resolve, reject) => {
        if (!description) {
            reject("NO DESCRIPTION")
        }
        else if (typeof description !== "string") {
            reject("DESCRIPTION MUST BE A STRING")
        }
        else if (description.length < 5) {
            reject("DESCRIPTION TOO SHORT")
        }
        resolve(description)
    });
}