
exports.up = function(knex) {
  return knex.schema.createTable('games', function(table){
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      
      table.string('e3_id').notNullable();

      table.foreign('e3_id').references('id').inTable('e3');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
