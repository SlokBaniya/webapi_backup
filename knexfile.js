const path = require('path');
module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'musicalplaza'
  },
  version: "5.2",
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, './migrations'),
  },
  useNullAsDefault: false
};


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "",
//   password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE musicalplaza", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });