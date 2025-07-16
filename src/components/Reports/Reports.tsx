import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar, FileText, Users, Activity, PieChart } from 'lucide-react';
import { generateComprehensiveReportPDF } from '../../utils/pdfGenerator';

const Reports: React.FC = () => {
  const generateReport = (reportType: string) => {
    // Generate specific report PDFs
    const pdf = generateComprehensiveReportPDF();
    pdf.save(`${reportType}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateComprehensiveReport = () => {
    const pdf = generateComprehensiveReportPDF();
    pdf.save(`comprehensive-hospital-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button 
            onClick={generateComprehensiveReport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Comprehensive Report</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Custom Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Patient Satisfaction</p>
              <p className="text-2xl font-bold text-gray-800">94%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
              <p className="text-2xl font-bold text-gray-800">87%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
              <p className="text-2xl font-bold text-gray-800">12 min</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Bed Occupancy</p>
              <p className="text-2xl font-bold text-gray-800">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Report Generation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Report Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => generateReport('patient-analytics')}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-800">Patient Analytics</h3>
            <p className="text-sm text-gray-600">Demographics, conditions, satisfaction</p>
          </button>
          
          <button 
            onClick={() => generateReport('financial-summary')}
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-800">Financial Summary</h3>
            <p className="text-sm text-gray-600">Revenue, payments, growth metrics</p>
          </button>
          
          <button 
            onClick={() => generateReport('operational-metrics')}
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <Activity className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-800">Operational Metrics</h3>
            <p className="text-sm text-gray-600">Efficiency, quality, utilization</p>
          </button>
          
          <button 
            onClick={() => generateReport('staff-performance')}
            className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
          >
            <PieChart className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-800">Staff Performance</h3>
            <p className="text-sm text-gray-600">Productivity, satisfaction, metrics</p>
          </button>
        </div>
      </div>

      {/* Advanced Analytics Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Advanced Analytics Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Real-time Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Occupancy</span>
                <span className="font-semibold text-gray-800">78%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Active Appointments</span>
                <span className="font-semibold text-gray-800">24</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Emergency Cases</span>
                <span className="font-semibold text-gray-800">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Staff on Duty</span>
                <span className="font-semibold text-gray-800">89</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Performance Trends</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Patient Satisfaction</span>
                  <span className="text-green-600 font-semibold">↑ 2.3%</span>
                </div>
                <div className="mt-1 bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue Growth</span>
                  <span className="text-blue-600 font-semibold">↑ 12.5%</span>
                </div>
                <div className="mt-1 bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Operational Efficiency</span>
                  <span className="text-purple-600 font-semibold">↑ 5.8%</span>
                </div>
                <div className="mt-1 bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;