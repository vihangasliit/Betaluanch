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

export { createEmployee };

