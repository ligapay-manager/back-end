const User = use('App/Models/User');
const UserService = use('App/Services/User');

const { authorize } = require('../Helpers/auth');
const api = require('../Api/Cartola');

const { checkWhere } = require('../Helpers/graphql');

const Queries = {
  Query: {
    allUsers: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { pages, rows: users } = await User.query()
        .with('wallet')
        .with('team')
        .paginate(paginate.current, paginate.perPage);

      return { ...pages, result: users.map(e => e.toJSON()) };
    },

    getUser: async (_, { where }) => {
      const user = await User.query()
        .where(where)
        .with('wallet')
        .with('team')
        .with('managedLeagues')
        .first();

      return user ? user.toJSON() : null;
    },
  },

  Mutation: {
    addUser: async (_, { user }) => {
      const { email, password } = user;

      const persistedUser = await UserService.create({ email, password });
      await persistedUser.loadMany(['wallet', 'team', 'managedLeagues']);

      return persistedUser.toJSON();
    },

    editUser: async (_, { where, data }) => {
      checkWhere(where);

      const user = await User.query()
        .where(where)
        .first();

      if (!user) {
        return null;
      }

      user.merge(data);

      try {
        await user.save();
        await user.loadMany(['wallet', 'team', 'managedLeagues']);

        return user.toJSON();
      } catch ({ code }) {
        switch (code) {
          case '23505':
            throw 'Unique violation.';

          default:
            throw 'An error occurred.';
        }
      }
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
            const { token } = await api.login(email, password);

            if (!token) {
              throw 'Invalid credentials.';
            }

            await UserService.create({ email, password, globoToken: token });
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
