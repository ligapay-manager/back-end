/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BankDetailsSchema extends Schema {
  up() {
    this.create('bank_details', (table) => {
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop('bank_details');
  }
}

module.exports = BankDetailsSchema;
