import { createApiInstance } from '../instance/axiosInstance';

const conversationsApi = createApiInstance('conversations');

export const fetchConversations = async () => {
  try {
    const response = await conversationsApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const fetchMessages = async (conversationId) => {
  try {
    const response = await conversationsApi.get(`/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const conversationById = async (conversationId) => {
  try {
    const response = await conversationsApi.get(`/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
