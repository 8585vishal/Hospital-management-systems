import React from 'react';
import { TrendingUp } from 'lucide-react';

const PatientChart: React.FC = () => {
  const data = [
    { month: 'Jan', patients: 120 },
    { month: 'Feb', patients: 135 },
    { month: 'Mar', patients: 148 },
    { month: 'Apr', patients: 162 },
    { month: 'May', patients: 175 },
    { month: 'Jun', patients: 188 },
  ];

  const maxPatients = Math.max(...data.map(d => d.patients));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Patient Growth</h3>
        <TrendingUp className="h-5 w-5 text-green-600" />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 text-sm text-gray-600">{item.month}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.patients / maxPatients) * 100}%` }}
              />
            </div>
            <div className="text-sm font-medium text-gray-800 w-8">{item.patients}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientChart;