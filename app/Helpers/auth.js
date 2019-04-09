const { reduce, pickBy } = require('lodash');

function authorize(object, authRule = async () => { }, options = { filters: [], only: [] }) {
  const filters = options.filters || [];
  const only = options.only || [];

  const fields = pickBy(object, (value, key) => {
    if (typeof object[key] === 'object') {
      return true;
    }

    return only.length
      ? only.includes(key) && !filters.includes(key)
      : !filters.includes(key);
  });

  const res = reduce(fields, (partial, value, key) => {
    switch (typeof value) {
      case 'object':
        partial[key] = authorize(value, authRule, options);
        break;

      case 'function':
        partial[key] = async (_, args, context) => {
          await authRule(context);

          return value(_, args, context);
        };
        break;

      // no default
    }

    return partial;
  }, {});

  return { ...object, ...res };
}

module.exports = {
  authorize,
};
