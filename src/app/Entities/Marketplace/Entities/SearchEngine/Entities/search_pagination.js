module.exports = ({ pagination }) => {
    return new Promise((resolve, reject) => {

        if (!pagination) {
            //search default
            pagination = {
                offset: 0,
                limit: 50
            }
            resolve(pagination)
            return
        }
        else if (typeof pagination !== "object") {
            reject("Pagination must be an object")
            return
        }
        //
        if (pagination.offset) {
            pagination.offfset = parseInt(pagination.offset, 10)
            if (isNaN(pagination.offfset)) {
                reject("Offeset is invalid")
                return
            }
        }
        else {
            pagination.offfset = 0
        }
        
        if (pagination.limit) {
            pagination.limit = parseInt(pagination.limit, 10)
            if (isNaN(pagination.limit)) {
                reject("Limit is invalid")
                return
            }
        }
        else {
            pagination.limit = 50
        }

        resolve(pagination)
    });
}

