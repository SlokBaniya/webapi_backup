
exports.up = async function(knex, Promise) {
   
    await knex.schema.hasTable("users");
    return await knex.schema.createTable('users', table => {
  
        table.increments('id').primary(),
        table.string('fullname'),
        table.string('username').unique(),
        table.string('password'),
        table.string('address'),
        table.string('contact'),
        table.string('gender')

      })
  
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users');
  
};
