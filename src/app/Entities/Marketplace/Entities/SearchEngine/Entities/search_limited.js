module.exports = ({ limited }) => {
    return new Promise((resolve, reject) => {
    
        if(limited !== true){
            limited = false
            resolve(limited)
            return
        }
        resolve(limited)
    });
}

