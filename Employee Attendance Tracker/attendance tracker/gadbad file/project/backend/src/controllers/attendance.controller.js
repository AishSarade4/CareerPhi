import asyncHandler from 'express-async-handler';
import { Attendance } from '../models/attendance.model.js';
import { startOfDay, endOfDay } from 'date-fns';

export const checkIn = asyncHandler(async (req, res) => {
  const today = new Date();
  const existingRecord = await Attendance.findOne({
    userId: req.user._id,
    date: {
      $gte: startOfDay(today),
      $lte: endOfDay(today),
    },
  });

  if (existingRecord?.checkIn) {
    res.status(400);
    throw new Error('Already checked in for today');
  }

  const attendance = await Attendance.findOneAndUpdate(
    {
      userId: req.user._id,
      date: {
        $gte: startOfDay(today),
        $lte: endOfDay(today),
      },
    },
    {
      checkIn: today,
      status: 'present',
    },
    {
      new: true,
      upsert: true,
    }
  );

  res.json(attendance);
});

export const checkOut = asyncHandler(async (req, res) => {
  const today = new Date();
  const attendance = await Attendance.findOne({
    userId: req.user._id,
    date: {
      $gte: startOfDay(today),
      $lte: endOfDay(today),
    },
  });

  if (!attendance?.checkIn) {
    res.status(400);
    throw new Error('Must check in first');
  }

  if (attendance.checkOut) {
    res.status(400);
    throw new Error('Already checked out for today');
  }

  attendance.checkOut = today;
  await attendance.save();

  res.json(attendance);
});

export const getAttendanceHistory = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;
  console.log("userId", userId);

  if (req.user.role !== 'manager' && userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this attendance record');
  }

  console.log("userId", userId);


  const attendance = await Attendance.find({ userId })
    .sort({ date: -1 })
    .limit(30);
  console.log("attendance", attendance);

  res.json(attendance);
});