import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const manager = (req, res, next) => {
  if (req.user && req.user.role === 'manager') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as manager');
  }
};
