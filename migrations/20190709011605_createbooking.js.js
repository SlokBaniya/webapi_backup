
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("booking");
    return await knex.schema.createTable('booking', table => {
  
        table.increments('id').primary(),
        table.string('itemsname'),
        table.string("itemId"),
        table.string('username'),
        table.string('userid'),        
        table.timestamps('orderdate')
      })
  
};

exports.down = function(knex, Promise) {
     knex.schema.dropTable('booking');
  
};
