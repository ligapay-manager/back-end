const { reduce } = require('lodash');

function checkWhere(where) {
  const isValidWhere = reduce(where, (prev, curr) => curr && prev, true);
  if (!isValidWhere) {
    throw 'At least one where clause should be provided.';
  }
}

module.exports = { checkWhere };
