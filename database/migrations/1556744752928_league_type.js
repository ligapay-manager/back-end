const Schema = use('Schema');

class LeagueTypeSchema extends Schema {
  up() {
    this.create('league_types', (table) => {
      table.increments();
      table
        .string('name')
        .unique()
        .notNullable();
      table.string('description');
      table.timestamps(true, true);
      table
        .boolean('deleted')
        .notNullable()
        .defaultsTo(0);
    });
  }

  down() {
    this.drop('league_types');
  }
}

module.exports = LeagueTypeSchema;
