import { createApiInstance } from '../instance/axiosInstance';
// import { API_BASE_URL } from '@env';


const apiInstance = createApiInstance('devices');

export const deviceApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */

  deviceRegister: async (data) => {
    return apiInstance.post("/register", data);
  },
};
