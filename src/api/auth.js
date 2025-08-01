import axios from 'axios';
import logger from '../utils/logger.js';

const API_URL = 'http://localhost:3001/auth'; // JSON Server endpoint

export const login = async (email, password) => {
  try {
    // In a real app, this would call your authentication API
    // For demo, we'll simulate a successful login
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    logger.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Simulate registration
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    logger.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Simulate logout
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    logger.error('Logout error:', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Simulate getting current user
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    logger.error('Get current user error:', error.response?.data || error.message);
    throw error;
  }
};