import axios from 'axios';

const API_URL = 'http://localhost:5000/';

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getEmployees = async (page) => {
  console.log(page);
  try {
    const response = await axios.get(`${API_URL}employees?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch employees');
  }
}

export { createEmployee, getEmployees };

