module.exports = (limit) => {
    return new Promise((resolve, reject) => {
      
        if (!limit) {
            resolve(30)
        }
        if (limit && isNaN(parseInt(limit, 10))) {
            return reject("Limit, if provided, must be a valid integer number")
        }
        resolve(limit)
    });
}

