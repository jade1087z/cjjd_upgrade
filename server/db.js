// db connect
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "jade",
    password: "zz3125",
    database: "cjjd",
});

con.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + con.threadId);
});
module.exports = con;
