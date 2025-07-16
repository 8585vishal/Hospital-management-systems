import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Calendar, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';

const AppointmentManagement: React.FC = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(appointment =>
    appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditAppointment = (appointment: any) => {
    alert(`Editing appointment ${appointment.id}\n\nPatient: ${appointment.patientId}\nDoctor: ${appointment.doctorId}\nDate: ${appointment.date}\nTime: ${appointment.time}\n\nThis would open the appointment edit form.`);
  };

  const handleDeleteAppointment = (appointment: any) => {
    if (window.confirm(`Are you sure you want to cancel this appointment?\n\nPatient: ${appointment.patientId}\nDate: ${appointment.date}\nTime: ${appointment.time}`)) {
      deleteAppointment(appointment.id);
      alert('Appointment has been cancelled successfully.');
    }
  };

  const handleCompleteAppointment = (appointment: any) => {
    updateAppointment(appointment.id, { ...appointment, status: 'completed' });
    alert(`Appointment marked as completed.\n\nPatient: ${appointment.patientId}\nDate: ${appointment.date}\nTime: ${appointment.time}`);
  };

  const handleMarkNoShow = (appointment: any) => {
    updateAppointment(appointment.id, { ...appointment, status: 'no-show' });
    alert(`Appointment marked as no-show.\n\nPatient: ${appointment.patientId}\nDate: ${appointment.date}\nTime: ${appointment.time}`);
  };

  const handleViewDetails = (appointment: any) => {
    alert(`Appointment Details:\n\nID: ${appointment.id}\nPatient: ${appointment.patientId}\nDoctor: ${appointment.doctorId}\nDate: ${appointment.date}\nTime: ${appointment.time}\nReason: ${appointment.reason}\nStatus: ${appointment.status}\nNotes: ${appointment.notes || 'No notes'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Appointment Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
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
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Patient ID: {appointment.patientId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Doctor ID: {appointment.doctorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(appointment)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button 
                        title="Edit Appointment"
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAppointment(appointment)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {appointment.status === 'scheduled' && (
                        <>
                          <button 
                            onClick={() => handleCompleteAppointment(appointment)}
                            className="text-emerald-600 hover:text-emerald-900 p-1 rounded transition-colors"
                            title="Mark as Completed"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleMarkNoShow(appointment)}
                            className="text-orange-600 hover:text-orange-900 p-1 rounded transition-colors"
                            title="Mark as No-Show"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
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

export default AppointmentManagement;