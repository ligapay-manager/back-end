const Schema = use('Schema');

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments();
      table
        .integer('wallet_origin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('wallets');
      table
        .integer('wallet_destiny_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('wallets');
      table.bigInteger('amount').notNullable();
      table.timestamps(true, true);
    });
  }

  down() {
    this.drop('transactions');
  }
}

module.exports = TransactionSchema;
