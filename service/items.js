const knex = require('knex');
const dbConfig = require('./../knexfile');
const dbClient = knex(dbConfig);




async function add(data) {
  try{ 
   const itemsname = data.itemsname;
    const price = data.price;
    const category = data.category;
    const desc = data.desc;
    const image = data.image;
    const created_at = data.created_at;
    const updated_at = data.updated_at;
    

  
 
 

  await dbClient.table('items').insert({itemsname: itemsname, price: price, category: category, desc: desc, image: image, created_at: created_at, updated_at: updated_at})
  }
    catch(error){
        console.log(error)

    }
  }
  ///////////////////////////


    module.exports = {
        add
      }