const path = require('path');
module.exports = {
<<<<<<< HEAD
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
=======
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        database: "musicalplaza",
        password: ""
    },
    version: "5.2",
    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    useNullAsDefault: true
>>>>>>> 0833f4a03ec4a0dd7b9e4e5bd3a04c1734ad66c4
};