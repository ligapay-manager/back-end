const Schema = use('Schema');

class LeagueSchema extends Schema {
  up() {
    this.create('leagues', (table) => {
      table.increments();
      table
        .integer('league_type_id')
        .unsigned()
        .references('id')
        .inTable('league_types');
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('avatar', 2048);
      table
        .integer('limit')
        .notNullable()
        .defaultsTo(20);
      table.bigInteger('fee').notNullable();
      table.bigInteger('adminTax').notNullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('leagues');
  }
}

module.exports = LeagueSchema;
