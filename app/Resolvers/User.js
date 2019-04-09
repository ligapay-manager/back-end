const User = use('App/Models/User');

const { authorize } = require('../Helpers/auth');

const Queries = {
  Query: {
    allUsers: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { rows: users } = await User.query().paginate(paginate.current, paginate.perPage);

      return users.map(e => e.toJSON());
    },
  },

  Mutation: {
    addUser: async (_, { user }) => {
      const { email, password, username } = user;

      return User.create({ email, password, username });
    },
  },
};

const authRule = async ({ auth }) => {
  await auth.check();
};

module.exports = authorize(Queries, authRule, ['allUsers']);
