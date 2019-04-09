

const { Command } = require('@adonisjs/ace');

class CreateUser extends Command {
  static get signature() {
    return `
      user:create
      { username: username }
      { password: password }
      { email: email }
     `;
  }

  static get description() {
    return 'Create a user if it does not exist';
  }

  async handle({ username, password, email }) {
    const Database = use('Database');
    const User = use('App/Models/User');

    const user = await User.query()
      .where({ username })
      .first();

    if (user !== null) {
      this.info('Admin user already exists. Skipping...');
    } else {
      await User.create({ username, password, email });

      this.success('✔ User created.');
    }

    Database.close();
  }
}

module.exports = CreateUser;
