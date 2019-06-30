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
    const category = data.category;
  
 
 

  await dbClient.table('users').insert({itemsname: itemsname, price: price, category: category, desc: desc, image: image, category: category})
  }
    catch(error){
        console.log(error)

    }
  }

    module.exports = {
        add
      }