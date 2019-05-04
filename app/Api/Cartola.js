const axios = require('axios');

const cartola = axios.create({ baseURL: 'https://api.cartolafc.globo.com/' });

const api = {
  login: async (email, password) => {
    try {
      const { data } = await axios.post('https://login.globo.com/api/authentication', {
        payload: { email, password, serviceId: 4728 },
      });

      return { token: data.glbId };
    } catch (error) {
      return { token: null };
    }
  },

  getTeam: async (globoToken) => {
    try {
      const { data } = await cartola.get('auth/time', {
        headers: { 'X-GLB-Token': globoToken },
      });

      return data.time;
    } catch (error) {
      return null;
    }
  },
};

module.exports = api;
