import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // JSON Server endpoint

export const login = async (email, password) => {
  try {
    // In a real app, this would call your authentication API
    // For demo, we'll simulate a successful login
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Simulate registration
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Simulate logout
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Simulate getting current user
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};