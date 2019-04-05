const User = use('App/Models/User');

module.exports = {
  Query: {
    allUsers: async () => {
      const { rows: users } = await User.all();

      return users;
    },
  },
};
