const User = use('App/Models/User');

const { authorize } = require('../Helpers/auth');
const api = require('../Api/Cartola');

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

    login: async (_, { info }, { auth }) => {
      const { password, email, refreshToken } = info;

      if (refreshToken) {
        return auth.newRefreshToken().generateForRefreshToken(refreshToken, true);
      }

      if (!password || !email) {
        throw 'Email and password must be provided.';
      }

      try {
        return await auth.withRefreshToken().attempt(email, password, true);
      } catch (error) {
        switch (error.code) {
          case 'E_USER_NOT_FOUND': {
            const { token } = api.login(email, password);

            if (!token) {
              throw 'Invalid credentials.';
            }

            await User.create({ email, password, globoToken: token });
            return auth.withRefreshToken().attempt(email, password, true);
          }

          default:
            throw 'Invalid credentials.';
        }
      }
    },
  },
};

const authRule = async ({ auth }) => {
  await auth.check();
};

module.exports = authorize(Queries, authRule, { filters: ['login'] });
