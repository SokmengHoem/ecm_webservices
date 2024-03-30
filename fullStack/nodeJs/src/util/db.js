
const mysql = require("mysql")
const util = require("util")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "reactjs-nodejs",
    port: "3306"
});

//need install util and import
db.query = util.promisify(db.query).bind(db);

module.exports = db;