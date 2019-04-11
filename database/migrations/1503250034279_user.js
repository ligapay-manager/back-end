const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table
        .string('email', 256)
        .notNullable()
        .unique();
      table.string('password', 64).notNullable();
      table.string('globoToken', 256);
      table.timestamps(true, true);
      table
        .boolean('deleted')
        .notNullable()
        .default(false);
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
