import express from 'express';
import { Attendance } from '../models/attendance.model.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Check in
router.post('/check-in', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      userId: req.user.userId,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Already checked in for today' });
    }

    const attendance = await Attendance.create({
      userId: req.user.userId,
      date: today,
      checkIn: new Date()
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check out
router.post('/check-out', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId: req.user.userId,
      date: today
    });

    if (!attendance) {
      return res.status(400).json({ message: 'No check-in found for today' });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: 'Already checked out for today' });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get attendance history
router.get('/history/:userId', auth, async (req, res) => {
  console.log("req", req.query);
  // console.log("res", res);

  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user.userId };
    console.log("query", query);

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(req.query.userId).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;