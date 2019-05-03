const BankDetails = use('App/Models/BankDetails');

const { authorize } = require('../Helpers/auth');

const Queries = {

  Mutation: {
    addBankDetails: async (_, { bankDetails }) => {
      const { bank, branch, account } = bankDetails;

      return BankDetails.create({ bank, branch, account });
    },

    deleteBankDetails: async (_, { bankDetails }) => {
      const { bank, branch, account } = bankDetails;

      return BankDetails.delete({ bank, branch, account });
    },
  },
};

const authRule = async ({ auth }) => {
  // await auth.check();
};

module.exports = authorize(Queries, authRule, { filters: ['login'] });
