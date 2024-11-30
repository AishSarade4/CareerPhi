import cron from 'node-cron';
import { Attendance } from '../models/attendance.model.js';
import { User } from '../models/user.model.js';
import { startOfDay, endOfDay } from 'date-fns';

export const initCronJobs = () => {
  // Mark absent at cutoff time (10:00 AM by default)
  cron.schedule('0 10 * * *', async () => {
    const today = new Date();
    const employees = await User.find({ role: 'employee' });
    
    for (const employee of employees) {
      const attendance = await Attendance.findOne({
        userId: employee._id,
        date: {
          $gte: startOfDay(today),
          $lte: endOfDay(today),
        },
      });
      
      if (!attendance?.checkIn) {
        await Attendance.create({
          userId: employee._id,
          date: today,
          status: 'absent',
        });
      }
    }
  });
};