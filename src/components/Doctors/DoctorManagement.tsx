import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, FileText, Phone } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import { Doctor } from '../../types';
import { generatePatientPDF } from '../../utils/pdfGenerator';

const DoctorManagement: React.FC = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDoctor = (doctor: Doctor) => {
    alert(`Viewing detailed profile for Dr. ${doctor.firstName} ${doctor.lastName}\n\nSpecialization: ${doctor.specialization}\nDepartment: ${doctor.department}\nExperience: ${doctor.experience} years\nSchedule: ${doctor.schedule}`);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    alert(`Editing profile for Dr. ${doctor.firstName} ${doctor.lastName}. This would open the doctor edit form.`);
  };

  const handleDeleteDoctor = (doctor: Doctor) => {
    if (window.confirm(`Are you sure you want to remove Dr. ${doctor.firstName} ${doctor.lastName} from the system?`)) {
      deleteDoctor(doctor.id);
      alert(`Dr. ${doctor.firstName} ${doctor.lastName} has been removed from the system.`);
    }
  };

  const handleScheduleAppointment = (doctor: Doctor) => {
    alert(`Scheduling appointment with Dr. ${doctor.firstName} ${doctor.lastName}. This would redirect to the appointment booking system.`);
  };

  const handleContactDoctor = (doctor: Doctor) => {
    alert(`Contacting Dr. ${doctor.firstName} ${doctor.lastName}\n\nPhone: ${doctor.phone}\nEmail: ${doctor.email}\n\nThis would open the communication interface.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Doctor</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Dr. {doctor.firstName} {doctor.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{doctor.qualification}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDoctor(doctor)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="View Doctor Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditDoctor(doctor)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="Edit Doctor"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDoctor(doctor)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                        title="Delete Doctor"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleScheduleAppointment(doctor)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded transition-colors"
                        title="Schedule Appointment"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleContactDoctor(doctor)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded transition-colors"
                        title="Contact Doctor"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;