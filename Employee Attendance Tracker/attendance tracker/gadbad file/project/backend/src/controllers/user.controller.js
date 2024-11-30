import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: 'employee' })
    .select('-password')
    .sort({ name: 1 });
  
  res.json(employees);
});