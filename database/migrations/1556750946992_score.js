const Schema = use('Schema');

class ScoreSchema extends Schema {
  up() {
    this.create('scores', (table) => {
      table.increments();
      table
        .integer('team_id')
        .unsigned()
        .references('id')
        .inTable('teams')
        .notNullable();
      table
        .integer('season_id')
        .unsigned()
        .references('id')
        .inTable('seasons')
        .notNullable();
      table.bigInteger('score').notNullable();
      table.timestamps(true, true);
      table
        .boolean('deleted')
        .notNullable()
        .defaultsTo(0);
    });
  }

  down() {
    this.drop('scores');
  }
}

module.exports = ScoreSchema;
