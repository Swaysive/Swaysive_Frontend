
import { createApiInstance } from '../instance/axiosInstance';
// import { API_BASE_URL } from '@env';
const apiInstance = createApiInstance('influencers');

export const influencerApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */


  getProducts: async () => {
    return apiInstance.get('/products');
  },

};
