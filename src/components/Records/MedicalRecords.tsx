import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Plus } from 'lucide-react';
import { generateMedicalRecordPDF } from '../../utils/pdfGenerator';

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockRecords = [
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      doctorId: '1',
      doctorName: 'Dr. Emily Wilson',
      date: '2024-01-25',
      diagnosis: 'Hypertension',
      treatment: 'Medication adjustment',
      prescription: 'Lisinopril 10mg daily',
      notes: 'Patient responded well to treatment. Continue current medication.',
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Sarah Johnson',
      doctorId: '2',
      doctorName: 'Dr. Robert Martinez',
      date: '2024-01-24',
      diagnosis: 'Asthma exacerbation',
      treatment: 'Inhaler prescribed',
      prescription: 'Albuterol inhaler as needed',
      notes: 'Patient educated on proper inhaler technique. Follow-up in 2 weeks.',
    },
    {
      id: '3',
      patientId: '3',
      patientName: 'Michael Brown',
      doctorId: '3',
      doctorName: 'Dr. Jennifer Davis',
      date: '2024-01-23',
      diagnosis: 'Migraine',
      treatment: 'Pain management and lifestyle changes',
      prescription: 'Sumatriptan 50mg as needed',
      notes: 'Discussed trigger identification and stress management techniques.',
    },
    {
      id: '4',
      patientId: '1',
      patientName: 'John Doe',
      doctorId: '2',
      doctorName: 'Dr. Robert Martinez',
      date: '2024-01-22',
      diagnosis: 'Diabetes Type 2 - Follow up',
      treatment: 'Blood sugar monitoring',
      prescription: 'Metformin 500mg twice daily',
      notes: 'HbA1c levels improved. Continue current regimen.',
    },
    {
      id: '5',
      patientId: '2',
      patientName: 'Sarah Johnson',
      doctorId: '1',
      doctorName: 'Dr. Emily Wilson',
      date: '2024-01-21',
      diagnosis: 'Annual Physical Exam',
      treatment: 'Routine screening',
      prescription: 'Multivitamin daily',
      notes: 'All vital signs normal. Recommended annual mammogram.',
    },
  ];

  const filteredRecords = mockRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadRecord = (record: any) => {
    const pdf = generateMedicalRecordPDF(record);
    pdf.save(`medical-record-${record.id}-${record.date}.pdf`);
  };

  const downloadAllRecords = () => {
    // Generate a comprehensive PDF with all records
    filteredRecords.forEach((record, index) => {
      setTimeout(() => {
        const pdf = generateMedicalRecordPDF(record);
        pdf.save(`medical-record-${record.id}-${record.date}.pdf`);
      }, index * 500); // Stagger downloads
    });
    
    alert(`Downloading ${filteredRecords.length} medical records as PDF files...`);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <div className="flex space-x-3">
          <button 
            onClick={downloadAllRecords}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download All</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Record</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medical records..."
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treatment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{record.patientName}</div>
                      <div className="text-gray-500">ID: {record.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{record.doctorName}</div>
                      <div className="text-gray-500">ID: {record.doctorId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => downloadRecord(record)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Download Record"
                      >
                      <Download className="h-4 w-4" />
                    </button>
                      <button 
                        onClick={() => alert(`Viewing detailed record for ${record.patientName}`)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <FileText className="h-4 w-4" />
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

export default MedicalRecords;