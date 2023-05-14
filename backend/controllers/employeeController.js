import express from 'express';

import EmployeeModel from '../models/employeeModel.js';

const router = express.Router();

export const getEmployees = async (req, res) => {

    try {
        // const page = req.query.page || 1;
        // const limit = 6;
        // const skip = (page - 1) * limit;

        const employees = await EmployeeModel.find()
            .select('_id employeeId displayName designation employeeType experience');

        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await EmployeeModel.findById(id)

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const getEmployeesByFilter = async (req, res) => {

    const employeeTypes = req.query.employeeType;
    try {
        const employees = await EmployeeModel.find({ employeeType: { $in: employeeTypes } })
            .select('_id employeeId displayName designation employeeType experience');

        return res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const createEmployee = async (req, res) => {

    const employee = req.body;
    try {
        const lastEmployee = await EmployeeModel.findOne().sort({ employeeId: -1 });
        const lastEmployeeId = lastEmployee ? lastEmployee.employeeId : 0;
        const newEmployeeId = `${parseInt(lastEmployeeId) + 1}`.padStart(4, '0');
        employee.employeeId = newEmployeeId;
        const newEmployee = new EmployeeModel(employee);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEmployee = async (req, res) => {

    const updatedFields = req.body;


    try {
        let employee = await EmployeeModel.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await EmployeeModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        let employee = await EmployeeModel.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await EmployeeModel.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export default router;