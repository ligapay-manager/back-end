const { join } = require('path');

module.exports = {
  options: {
    debug: false,
    endpointURL: '/gql',
  },

  schema: join(__dirname, '../app/Schema'),
  resolvers: join(__dirname, '../app/Resolvers'),
};
