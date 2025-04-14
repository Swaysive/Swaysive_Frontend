import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an instance of axios
const API = axios.create({
    baseURL: `${BASE_URL}/auth`, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(async (config) => {
    try {
        // Retrieve tokens from localStorage
        const accessToken = localStorage.getItem('accessToken');
        const sessionToken = localStorage.getItem('sessionToken');

        // Add access token to Authorization header
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Add session token to custom session-token header
        if (sessionToken) {
            config.headers.session = sessionToken;
        }

        return config;
    } catch (error) {
        console.error('Error attaching tokens to request:', error);
        throw error;
    }
});

// Helper function to get the access token from localStorage
const getAccessToken = async () => {
    return localStorage.getItem('accessToken');
};

// Register API function
export const register = async (userData) => {
    try {
        const response = await API.post('/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data?.message);
        throw error.response?.data?.message;
    }
};

// Login API function
export const login = async (credentials) => {
    try {
        const response = await API.post('/signin', credentials);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data?.message);
        throw error.response?.data?.message;
    }
};

export const googleAuth = async (credentials) => {
    try {
        const response = await API.post('/google', credentials);
        return response.data;
    } catch (error) {
        console.error('Google authentication failed:', error.response?.data?.message);
        throw error.response?.data?.message;
    }
};

// Email verification API function
export const verifyEmail = async (data) => {
    try {
        const response = await API.post('/verify-email', data);
        return response.data;
    } catch (error) {
        console.error('Email verification failed:', error);
        throw error;
    }
};

// Resend Email Verification
export const resendEmail = async (data) => {
    try {
        const response = await API.post('/resend-verification-email', data);
        return response.data;
    } catch (error) {
        console.error('Resend verification failed:', error);
        throw error;
    }
};

// Password reset API function
export const resetPassword = async (data) => {
    try {
        const response = await API.post('/reset-password', data);
        return response.data;
    } catch (error) {
        console.error('Password reset failed:', error);
        throw error;
    }
};

// Forgot Password API function
export const forgotPassword = async (data) => {
    try {
        const response = await API.post('/forgot-password', data);
        return response.data;
    } catch (error) {
        console.error('Forgot password request failed:', error);
        throw error;
    }
};

// Get user profile API function (with access token)
export const getUserProfile = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await API.get('/get/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

// Logout API function
export const logout = async (data) => {
    try {
        const accessToken = await getAccessToken();
        const response = await API.post('/logout', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to logout:', error.response?.data || error.message);
        throw error;
    }
};

// Refresh access token (using refresh token)
export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await API.post('/refresh', { refreshToken });
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};
