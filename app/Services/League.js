const League = use('App/Models/League');
const Wallet = use('App/Models/Wallet');

class LeagueService {
  static async create(data) {
    const league = new League();
    league.fill(data);

    await league.wallet().associate(new Wallet());

    return league;
  }
}

module.exports = LeagueService;
