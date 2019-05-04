const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const Team = use('App/Models/Team');

const { getTeam } = require('../Api/Cartola');

class UserService {
  static async create(data) {
    const {
      nome_cartola: cartolaName,
      nome: name,
      slug: cartolaSlug,
      url_escudo_png: avatar,
    } = await getTeam(data.globoToken);

    const user = new User();
    user.fill({ ...data, cartolaName });

    await user.wallet().associate(new Wallet());

    const team = new Team();
    team.fill({ name, cartolaSlug, avatar });

    await user.team().save(team);

    return user;
  }
}

module.exports = UserService;
