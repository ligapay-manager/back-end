const axios = require('axios');

const api = {
  login: async (email, password) => {
    try {
      const {
        data: { glbId: token },
      } = await axios.post('https://login.globo.com/api/authentication', {
        payload: { email, password, serviceId: 4728 },
      });

      return { token };
    } catch (error) {
      return { token: null };
    }
  },
};

module.exports = api;
