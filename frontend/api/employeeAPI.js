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

const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.patch(`${API_URL}${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}employees`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch employees');
  }
}

const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch employees');
  }
}

const getEmployeesByFilter = async (employeeType) => {
  try {
    const response = await axios.get(`${API_URL}filter?employeeType=${employeeType}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteEmployees = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { createEmployee,updateEmployee, getEmployeeById ,getEmployees, getEmployeesByFilter, deleteEmployees };

