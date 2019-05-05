const { Command } = require('@adonisjs/ace');

class CreateUser extends Command {
  static get signature() {
    return `
      user:create
      { email: email }
      { password: password }
     `;
  }

  static get description() {
    return 'Create a user if it does not exist';
  }

  async handle({ password, email }) {
    const Database = use('Database');
    const User = use('App/Models/User');

    const user = await User.query()
      .where({ email })
      .first();

    if (user !== null) {
      this.info('User already exists. Skipping...');
    } else {
      await User.create({ password, email });

      this.success('✔ User created.');
    }

    Database.close();
  }
}

module.exports = CreateUser;
