import { createApiInstance } from "../instance/axiosInstance";
// import { API_BASE_URL } from '@env';

const apiInstance = createApiInstance("users");

export const usersApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */

  userOnboard: async (data) => {
    return apiInstance.post("/onboard", data);
  },

  getOnboardStatus: async () => {
    return apiInstance.get("/onboard/status");
  },

  getCurrentPlan: async () => {
    return apiInstance.get("/subscription/current");
  },

  sendInvitations: async (data) => {
    return apiInstance.post("/invitation/send", data);
  },

  acceptInvitation: async (data) => {
    return apiInstance.post("/invitation/accept", data);
  },

  subscriptionChange: async (payload) => {
    return apiInstance.post("/subscription/change", payload);
  },

  viewInvitations: async () => {
    return apiInstance.get("/invitation/view");
  },

  getBillingMethods: async () => {
    return apiInstance.get("/billing-methods");
  },

  getUsers: async ({ type }) => {
    return apiInstance.get(`/`, {
      params: { type },
    });
  },
};
