
exports.up = async function(knex, Promise) {
   
    await knex.schema.hasTable("users");
    return await knex.schema.createTable('users', table => {
  
        table.increments('id').primary(),
        table.string('fullname'),
        table.string('username'),
        table.string('password')
      })
  
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users');
  
};
