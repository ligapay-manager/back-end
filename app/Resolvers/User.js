const User = use('App/Models/User');
const UserService = use('App/Services/User');

const { authorize } = require('../Helpers/auth');
const api = require('../Api/Cartola');

const Queries = {
  Query: {
    allUsers: async (_, { paginate = { perPage: 10, current: 1 } }) => {
      const { rows: users } = await User.query()
        .with('wallet')
        .paginate(paginate.current, paginate.perPage);

      return users.map(e => e.toJSON());
    },

    getUser: async (_, { where }) => {
      const user = await User.query()
        .where(where)
        .first();

      return user ? user.toJSON() : null;
    },
  },

  Mutation: {
    addUser: async (_, { user }) => {
      const { email, password } = user;

      const persistedUser = await UserService.create({ email, password });
      await persistedUser.load('wallet');

      return persistedUser.toJSON();
    },

    editUser: async (_, { user: { id, ...data } }) => {
      const user = await User.find(id);

      if (!user) {
        return null;
      }

      user.merge(data);

      try {
        await user.save();
        await user.load('wallet');

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
