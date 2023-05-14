import express from 'express';

import { createEmployee,getEmployeeById ,deleteEmployee, getEmployees, getEmployeesByFilter, updateEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/filter', getEmployeesByFilter);
router.get('/employees', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/',  createEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;