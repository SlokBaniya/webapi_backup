
exports.up = async function(knex, Promise) {
  return await knex.schema.createTable('users', table => {
  
    table.increments('id').primary(),
    table.string('username').unique(),
    table.string('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
