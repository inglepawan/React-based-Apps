import axios from 'axios';

const API_URL = 'http://localhost:3001/attendance'; // JSON Server endpoint

export const getAttendance = async (employeeId, month, year) => {
  try {
    const response = await axios.get(`${API_URL}?employeeId=${employeeId}&month=${month}&year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};

export const punchIn = async (employeeId) => {
  try {
    const response = await axios.post(`${API_URL}/punch-in`, { employeeId });
    return response.data;
  } catch (error) {
    console.error('Error punching in:', error);
    throw error;
  }
};

export const punchOut = async (employeeId) => {
  try {
    const response = await axios.post(`${API_URL}/punch-out`, { employeeId });
    return response.data;
  } catch (error) {
    console.error('Error punching out:', error);
    throw error;
  }
};

export const getAttendanceReport = async (employeeId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/report`, {
      params: { employeeId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance report:', error);
    throw error;
  }
};