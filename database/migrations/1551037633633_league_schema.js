const Schema = use('Schema');

class LeagueSchema extends Schema {
  up() {
    this.create('leagues', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('leagues');
  }
}

module.exports = LeagueSchema;
