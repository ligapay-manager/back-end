const { reduce } = require('lodash');

function authorize(object, authRule = async () => { }, filters = []) {
  return reduce(object, (res, value, key) => {
    if (filters.includes(key)) {
      res[key] = value;
    } else {
      switch (typeof value) {
        case 'object':
          res[key] = authorize(value, authRule, filters);
          break;

        case 'function':
          res[key] = async (_, args, context) => {
            await authRule(context);

            return value(_, args, context);
          };
          break;

        default:
          res[key] = value;
          break;
      }
    }

    return res;
  }, {});
}

module.exports = {
  authorize,
};
