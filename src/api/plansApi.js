
import { createApiInstance } from '../instance/axiosInstance';
// import { API_BASE_URL } from '@env';



const apiInstance = createApiInstance('plans');

export const plansApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */


  getAllPlans: async () => {
    return apiInstance.get('/');
  },

};
