const Schema = use('Schema');

class LeagueSchema extends Schema {
  up() {
    this.create('leagues', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('league_type_id')
        .unsigned()
        .references('id')
        .inTable('league_types');
      table
        .integer('wallet_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('wallets');
      table
        .string('name')
        .unique()
        .notNullable();
      table.string('description');
      table.string('avatar', 2048);
      table
        .integer('limit')
        .notNullable()
        .defaultsTo(20);
      table
        .bigInteger('fee')
        .notNullable()
        .defaultsTo(0);
      table
        .bigInteger('adminTax')
        .notNullable()
        .defaultsTo(0);
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('leagues');
  }
}

module.exports = LeagueSchema;
