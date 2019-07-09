const knex = require('knex');
const dbConfig = require('./../knexfile');
const dbClient = knex(dbConfig);




async function add(data) {
  try{
   const itemsname = data.itemsname;
    const itemId = data.itemId;
    const username = data.username;
    const userid = data.userid;
  
    const created_at = data.created_at;

  await dbClient.table('booking').insert({itemsname: itemsname, itemId: itemId, username: username, userid: userid, created_at: created_at})
  }
    catch(error){
        console.log(error)

    }
  }

  module.exports = {
    add
    // view
  }