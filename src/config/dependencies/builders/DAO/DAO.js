module.exports = class DAO {
    constructor() {
        this.Database = new (require("../Factory/Database/Database"))()
        console.log("constructor called")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let Database = this.Database
            let SysDAO = require("./System/SystemDAO")
            let UserDAO = require("./User/UserDAO")
            
            try {
                await Database.initialize()
                let db = Database.export()
                //
                let DAO = {
                    System: new SysDAO(db),
                    User: new UserDAO(db)
                }
                resolve(DAO)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }
}