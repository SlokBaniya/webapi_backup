
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("items");
    return await knex.schema.createTable('items', table => {
  
        table.increments('id').primary(),
        table.string('itemsname'),
        table.string("category");
        table.string('price'),
        table.string('desc'),
        table.string('image'),
        table.timestamps()
      })
  
};

exports.down = function(knex, Promise) {
     knex.schema.dropTable('users');
  
};
