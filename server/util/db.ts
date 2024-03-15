// db connect
const mysql = require("mysql2");

const con = mysql
    .createPool({
        host: "localhost",
        user: "root",
        password: "3125",
        database: "cjjd",
    })
    .promise();

export default con;