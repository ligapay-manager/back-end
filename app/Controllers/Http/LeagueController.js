const League = use('App/Models/League');

class LeagueController {
  async create({ request }) {
    const data = request.only(['name', 'description']);

    const league = await League.create(data);

    return league;
  }
}

module.exports = LeagueController;
