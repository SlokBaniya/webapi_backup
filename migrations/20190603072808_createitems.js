
exports.up = function(knex, Promise) {
    await knex.schema.hasTable("items");
    return await knex.schema.createTable('items', table => {
  
        table.increments('id').primary(),
        table.string('itemsname'),
        table.string('price'),
        table.string('desc'),
        table.string('image')
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  
};
