import { createApiInstance } from "../instance/axiosInstance";
// import { API_BASE_URL } from '@env';

const apiInstance = createApiInstance("billing");

export const billingApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */

  getCurrentPlan: async () => {
    return apiInstance.get("/subscription/current");
  },

  getBillingMethods: async () => {
    return apiInstance.get("/methods");
  },

  addBillingMethod: async (type) => {
    return apiInstance.post("/methods",type);
  },

  updateBillingMethods: async (stripeId) => {
    return apiInstance.patch(`/methods/${stripeId}`, {isDefault: true});
  },

  subscriptionChange: async (payload) => {
    return apiInstance.post("/subscription/change", payload);
  },


};
