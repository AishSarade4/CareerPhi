import express from 'express';
import { getEmployees } from '../controllers/user.controller.js';
import { protect, manager } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/employees', getEmployees);

export default router;