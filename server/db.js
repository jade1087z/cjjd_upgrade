// db connect

const mysql = require("mysql2");

const con = mysql
    .createPool({
        host: "localhost",
        user: "jade",
        password: "zz3125",
        database: "cjjd",
    })
    .promise();

module.exports = con;
