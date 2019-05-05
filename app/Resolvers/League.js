const League = use('App/Models/League');
const LeagueService = use('App/Services/League');

module.exports = {
  Query: {
    allLeagues: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { pages, rows: leagues } = await League.query()
        .with('type')
        // .with('subscriptions')
        // .with('seasons')
        .with('wallet')
        .with('manager')
        .paginate(paginate.current, paginate.perPage);

      return { ...pages, result: leagues.map(e => e.toJSON()) };
    },
  },

  Mutation: {
    addLeague: async (_, { data }) => {
      const league = await LeagueService.create(data);

      await league.loadMany(['wallet', 'manager', 'type']);

      return league.toJSON();
    },
  },
};
