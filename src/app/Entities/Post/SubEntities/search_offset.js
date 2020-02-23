module.exports = (offset) => {
    return new Promise((resolve, reject) => {

        if (!offset) {
            resolve(0)
        }
        if (offset && isNaN(parseInt(offset, 10))) {
            return reject("Offset, if provided, must be a valid integer number")
        }
        resolve(offset)
    });
}

