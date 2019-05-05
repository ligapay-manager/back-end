const Schema = use('Schema');

class SubscriptionSchema extends Schema {
  up() {
    this.create('subscriptions', (table) => {
      table.increments();
      table
        .integer('league_id')
        .unsigned()
        .references('id')
        .inTable('leagues');
      table
        .integer('season_id')
        .unsigned()
        .references('id')
        .inTable('seasons');
      table
        .integer('team_id')
        .unsigned()
        .references('id')
        .inTable('teams');
      table
        .bigInteger('fee')
        .notNullable()
        .defaultsTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('subscriptions');
  }
}

module.exports = SubscriptionSchema;
