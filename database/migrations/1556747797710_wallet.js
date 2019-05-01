const Schema = use('Schema');

class WalletSchema extends Schema {
  up() {
    this.create('wallets', (table) => {
      table.increments();
      table
        .bigInteger('amount')
        .notNullable()
        .defaultsTo(0);
      table.timestamps(true, true);
      table
        .boolean('deleted')
        .notNullable()
        .defaultsTo(0);
    });
  }

  down() {
    this.drop('wallets');
  }
}

module.exports = WalletSchema;
