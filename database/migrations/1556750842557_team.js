const Schema = use('Schema');

class TeamSchema extends Schema {
  up() {
    this.create('teams', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.string('name').notNullable();
      table.string('avatar', 2048);
      table.timestamps();
      table
        .boolean('deleted')
        .notNullable()
        .defaultsTo(0);
    });
  }

  down() {
    this.drop('teams');
  }
}

module.exports = TeamSchema;
