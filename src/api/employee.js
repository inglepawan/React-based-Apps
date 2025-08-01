import axios from 'axios';
import logger from '../utils/logger.js';

const API_URL = 'http://localhost:3001/employees'; // JSON Server endpoint

export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    logger.error('Error fetching employees:', error.response?.data || error.message);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching employee:', error.response?.data || error.message);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    logger.error('Error adding employee:', error.response?.data || error.message);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    logger.error('Error updating employee:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Error deleting employee:', error.response?.data || error.message);
    throw error;
  }
};