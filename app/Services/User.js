const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const Team = use('App/Models/Team');

class UserService {
  static async create(data) {
    const user = new User();
    user.fill(data);

    await user.wallet().associate(new Wallet());

    const team = new Team();
    team.fill({ name: `${user.email}'s Team` });

    await user.team().save(team);

    return user;
  }
}

module.exports = UserService;
