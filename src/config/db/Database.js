const config = require("./config")
const Mongo = require("mongodb")
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://TheAdmin:${config.password}@rpjcoding-g8dkl.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });


class Database {
    constructor() {
        this.conn
        this.ObjectId = Mongo.ObjectId
    }

    async initialize_database() {
        return new Promise((resolve, reject) => {
            client.connect((erro, conn) => {
                if (erro) {
                    console.log("**** DATABASE ERROR:" + erro)
                    process.abort()
                }
                console.log("CONNECTED TO DATABASE")
                this.db = conn.db(config.db)
                resolve()
            });
        });
    }

    export_connection() {
        return this.db
    }

}

module.exports = Database;