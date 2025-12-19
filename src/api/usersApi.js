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

  // getCurrentPlan: async () => {
  //   return apiInstance.get("/billing/subscription/current");
  // },

  sendInvitations: async (data) => {
    return apiInstance.post("/invitation/send", data);
  },

  getInfluencerDetails: async (id) => {
    return apiInstance.get(`/influencers/${id}`);
  },

  acceptInvitation: async (data) => {
    return apiInstance.post("/invitation/accept", data);
  },

  viewInvitations: async () => {
    return apiInstance.get("/invitation/view");
  },

  getProducts: async () => {
    return apiInstance.get('/influencer/products');
  },

  // getBillingMethods: async () => {
  //   return apiInstance.get("/billing/methods");
  // },

  getUsers: async ({ type }) => {
    return apiInstance.get(`/`, {
      params: { type },
    });
  },
};
