import request from 'supertest';
import app from './app.js';
import mongoose from 'mongoose';
import EmployeeModel from './models/employeeModel.js';

const MONGODB_URI="mongodb+srv://admin:admin@mern.ewbkz.mongodb.net/?retryWrites=true&w=majority"

describe('Employee routes', () => {
  let server;
  let createdEmployee;

  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    server = app.listen(3000);
  }, 30000);

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  }, 30000);

  describe('POST /employees', () => {
    it('should create a new employee', async () => {
      const employee = {
        fullName: 'John Doe',
        employeeId: 2345,
        nameWithInitials: 'J. Doe',
        displayName: 'John D.',
        gender: 'Male',
        DOB: '1990-01-01',
        email: 'john.doe@example.com',
        mobileNumber: '1234567890',
        designation: 'Software Engineer',
        employeeType: 'Full Time',
        joinDate: '2021-01-01',
        experience: '2 years',
        salary: 50000,
        note: 'Some note',
      };
      const res = await request(server).post('/').send(employee);
      expect(res.status).toBe(201);
      expect(res.body.fullName).toBe(employee.fullName);
      createdEmployee = res.body;
    }, 30000);

    
  });

  describe('GET /employees', () => {
    it('should return a list of employees', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe('PATCH /:id', () => {
    it('should update an employee', async () => {
      const updatedEmployee = { ...createdEmployee, displayName: 'John D.' };
      const res = await request(server).patch(`/${createdEmployee._id}`).send(updatedEmployee);
      expect(res.status).toBe(200);
      expect(res.body.displayName).toBe(updatedEmployee.displayName);
      createdEmployee = res.body;
    }, 30000);
  });

  describe('DELETE /:id', () => {
    it('should delete an employee', async () => {
      const res = await request(server).delete(`/${createdEmployee._id}`);
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Employee removed');
    }, 30000);
  });
  

});