import React from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import StatsCard from './StatsCard';
import RecentAppointments from './RecentAppointments';
import PatientChart from './PatientChart';
import DoctorActivity from './DoctorActivity';
import HeroSection from './HeroSection';
import JavaIntegration from '../Backend/JavaIntegration';

const Dashboard: React.FC = () => {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HeroSection />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="blue"
          trend="+12% from last month"
        />
        <StatsCard
          title="Active Doctors"
          value={stats.totalDoctors}
          icon={UserCheck}
          color="green"
          trend="+3% from last month"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={Calendar}
          color="purple"
          trend="23 completed"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          color="orange"
          trend="+8% from last month"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientChart />
        <DoctorActivity />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAppointments />
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">Low Inventory</p>
                <p className="text-xs text-gray-600">Medical supplies running low</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">Scheduled Maintenance</p>
                <p className="text-xs text-gray-600">System maintenance at 2:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Java Backend Integration */}
      <JavaIntegration />
    </div>
  );
};

export default Dashboard;