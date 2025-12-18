// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
// import { API_BASE_URL } from '@env';
import { createApiInstance } from "../instance/axiosInstance";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const BASE_URL = 'https://dev.cooksbook.com/api/diet';
// const BASE_URL = `${API_BASE_URL}/api/v1/guest-pass`;

// Axios instance
const apiClient = axios.create({
  baseURL: `${BASE_URL}/auth/products`,
});

// Intercept request to attach token
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (sessionToken) {
    config.headers.session = sessionToken;
  }
  return config;
});

const apiInstance = createApiInstance("campaigns");

export const campaignApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */

  createCouponsCode: async ({ data }) => {
    return apiInstance.post(`/coupons`, data);
  },

  assignInfluencerToProduct: async ({ productId, influencerId }) => {
    return apiInstance.post(`/assign`, { productId, influencerId });
  },

  productAnalytics: async (productId) => {
    return apiInstance.get(`/analytics?productId=${productId}`);
  },

    downloadCoupon: async (couponId) => {
    return apiInstance.get(`/coupons/${couponId}/download`);
  },

  generateAffiliateLink: async ({
    productId,
    influencerId,
    commissionRate,
    variantIds,
  }) => {
    return apiInstance.post(`/generate-affiliate-link`, {
      commissionRate,
      productId,
      influencerId,
    });
  },
};
