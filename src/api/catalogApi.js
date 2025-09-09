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
  // console.log('Session Token:', sessionToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (sessionToken) {
    config.headers.session = sessionToken;
  }
  return config;
});

const apiInstance = createApiInstance("catalog");

export const catalogApi = {
  /**
   * Setup a new gym profile
   * @param {Object} data - Gym setup data
   * @returns {Promise}
   */

  getProducts: async ({ page, limit }) => {
    return apiInstance.get("/products", {
      params: { page, limit },
    });
  },

  getProductDetail: async (productId) => {
    return apiInstance.get(`/products/${productId}`);
  },

  getVariants: async (productId) => {
    return apiInstance.get(`/products/${productId}/variants`);
  },

  getBrands: async ({ page, limit }) => {
    return apiInstance.get("/brands", {
      params: { page, limit },
    });
  },

  getBrandDetail: async (brandId) => {
    return apiInstance.get(`/brands/${brandId}`);
  },

  getBrandProducts: async ({ page, limit, brandId }) => {
    return apiInstance.get(`/brands/${brandId}/products`, {
      params: { page, limit },
    });
  },

  createCouponsCode: async ({data,productId}) => {
    return apiInstance.post(`/products/${productId}/discounts`, data);
  },

  productAnalytics: async (productId) => {
    return apiInstance.get(`/products/${productId}/analytics`);
  },

  productCodes: async (productId) => {
    return apiInstance.get(`/products/${productId}/codes`);
  },

  assignInfluencerToProduct: async ({productId,influencerId}) => {
    return apiInstance.post(`/products/${productId}/influencers/${influencerId}`);
  },

  generateAffiliateLink: async ({productId,influencerId,commissionRate,variantIds}) => {
    return apiInstance.post(`/products/${productId}/influencers/${influencerId}/generate-affiliate-links`,{commissionRate,variantIds});
  },


};
