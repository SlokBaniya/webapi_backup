const path = require('path');
module.exports = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        database: "contacts",
        password: ""
    },
    version: "5.2",
    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    useNullAsDefault: true
};