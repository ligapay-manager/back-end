const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');

class UserService {
  static async create(data) {
    const wallet = await Wallet.create(null);
    const user = await User.create(data);

    await wallet.user().save(user);

    return user;
  }
}

module.exports = UserService;
