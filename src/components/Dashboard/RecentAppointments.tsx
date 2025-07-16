import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';

const RecentAppointments: React.FC = () => {
  const { appointments } = useAppointments();
  const recentAppointments = appointments.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
      <div className="space-y-4">
        {recentAppointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                Patient ID: {appointment.patientId}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{appointment.date}</span>
                <Clock className="h-3 w-3" />
                <span>{appointment.time}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAppointments;