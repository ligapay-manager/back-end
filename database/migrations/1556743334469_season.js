const Schema = use('Schema');

class SeasonSchema extends Schema {
  up() {
    this.create('seasons', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('seasons');
  }
}

module.exports = SeasonSchema;
