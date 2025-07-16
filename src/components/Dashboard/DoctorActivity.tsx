import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';

const DoctorActivity: React.FC = () => {
  const { doctors } = useDoctors();
  const activeDoctors = doctors.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Doctor Activity</h3>
        <Activity className="h-5 w-5 text-blue-600" />
      </div>
      <div className="space-y-4">
        {activeDoctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-xs text-gray-500">{doctor.specialization}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-medium text-gray-800">Active</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>8 hrs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorActivity;