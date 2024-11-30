import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

dotenv.config();

async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create manager
    await User.create({
      name: 'Test Manager',
      email: 'manager@test.com',
      password: 'password123',
      role: 'manager'
    });
    
    // Create employee
    await User.create({
      name: 'Test Employee',
      email: 'employee@test.com',
      password: 'password123',
      role: 'employee'
    });
    
    console.log('Test users created successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

createUsers();