import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AttendanceTable } from '../components/AttendanceTable';
import { checkIn, checkOut, getAttendanceHistory, getEmployees } from '../services/api';
import { User, AttendanceRecord } from '../types/index';
import toast from 'react-hot-toast';
import { Clock, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user, selectedEmployee, checkIn, checkOut]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (user?.role === 'manager') {
        const employeeList = await getEmployees();
        setEmployees(employeeList);
      }
    
      const history = await getAttendanceHistory(selectedEmployee)
      const sortHistory: any[] | ((prevState: AttendanceRecord[]) => AttendanceRecord[])  = [];
      history.map((item: any) => {
        if (item.userId === selectedEmployee) {
          sortHistory.push(item)
        }
      })

      setAttendanceRecords(sortHistory);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await checkIn().then((res) => {
        
        setSelectedEmployee(res.userId);
      })
      toast.success('Checked in successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to check in');
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut().then((res) => {
        setSelectedEmployee(res.userId);
      })
      toast.success('Checked out successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to check out');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendanceRecords.find(
    (record) => record.date.split('T')[0] === today
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {user?.role === 'manager' ? 'Manager Dashboard' : 'Employee Dashboard'}
          </h2>
          {user?.role === 'employee' && (
            <div className="space-x-4">
              <button
                onClick={handleCheckIn}
                // disabled={todayRecord?.checkIn}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <Clock className="h-5 w-5 mr-2" />
                Check In
              </button>
              <button
                onClick={handleCheckOut}
                // disabled={!todayRecord?.checkIn || todayRecord?.checkOut}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                <Clock className="h-5 w-5 mr-2" />
                Check Out
              </button>
            </div>
          )}
        </div>

        {user?.role === 'manager' && (
          <div className="mt-4">
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
              Select Employee
            </label>
            <select
              id="employee"
              className="mt-1 block w-full text-base border-gray-300 focus:ring-indigo-500 sm:text-sm rounded-md"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <AttendanceTable records={attendanceRecords} />
      )}
    </div>
  );
};
