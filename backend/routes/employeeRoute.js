import express from 'express';

import { createEmployee, deleteEmployee, getEmployees, getEmployeesByFilter, updateEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/filter', getEmployeesByFilter);
router.get('/', getEmployees);
router.post('/',  createEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;