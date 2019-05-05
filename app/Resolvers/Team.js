const Team = use('App/Models/Team');

const { checkWhere } = require('../Helpers/graphql');

module.exports = {
  Query: {
    allTeams: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { pages, rows: teams } = await Team.query()
        .with('user')
        .paginate(paginate.current, paginate.perPage);

      return { ...pages, result: teams.map(e => e.toJSON()) };
    },

    getTeam: async (_, { where }) => {
      const team = await Team.query()
        .where(where)
        .with('user.wallet')
        .with('user.team')
        .first();

      return team ? team.toJSON() : null;
    },
  },

  Mutation: {
    editTeam: async (_, { where, data }) => {
      checkWhere(where);

      const team = await Team.query()
        .where(where)
        .first();

      if (!team) {
        return null;
      }

      team.merge(data);

      try {
        await team.save();
        await team.loadMany(['user']);

        return team.toJSON();
      } catch ({ code }) {
        switch (code) {
          case '23505':
            throw 'Unique violation.';

          default:
            throw 'An error occurred.';
        }
      }
    },
  },
};
