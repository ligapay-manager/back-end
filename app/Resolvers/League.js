const League = use('App/Models/League');

module.exports = {
  Query: {
    allLeagues: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { pages, rows: leagues } = await League.query()
        // .with('type')
        // .with('subscriptions')
        // .with('seasons')
        .with('wallet')
        .with('manager')
        .paginate(paginate.current, paginate.perPage);

      return { ...pages, result: leagues.map(e => e.toJSON()) };
    },
  },

  Mutation: {
    //
  },
};
