import mongoose from 'mongoose';
import Joi from "joi"


const EmployeeSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required.'],
    },
    employeeId: {
        type: String,
        default: "0000"
    },
    nameWithInitials: {
        type: String,
        required: [true, 'Name With Initials is required.'],
    },
    displayName: {
        type: String,
        required: [true, 'Display Name Type is required.'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required.'],
        emu: Joi.string().valid('Male', 'Female')
    },
    DOB: {
        type: Date,
        required: [true, 'Date of birth is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email Type is required.'],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please enter a valid email address.'],
    },
    mobileNumber: {
        type: Number,
        required: [true, 'Mobile Number is required.'],
        match: [/^[0-9]{10}$/, 'Please enter a valid mobile number.'],
    },
    designation: {
        type: String,
        required: [true, 'Designation is required.'],
    },
    employeeType: {
        type: String,
        required: [true, 'Employee Type is required.'],
        emu: Joi.string().valid('Full Time', 'Part Time', 'Contract', 'Other')
    },
    joinDate: {
        type: Date,
        required: [true, 'Joined Date is required.'],
    },
    experience: {
        type: String,
        required: [true, 'Designation is required.'],
    },
    salary: {
        type: Number,
        required: [true, 'Salary Type is required.'],
    },
    note: {
        type: String,
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;