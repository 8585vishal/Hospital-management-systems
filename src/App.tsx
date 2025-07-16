import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import PatientManagement from './components/Patients/PatientManagement';
import DoctorManagement from './components/Doctors/DoctorManagement';
import AppointmentManagement from './components/Appointments/AppointmentManagement';
import MedicalRecords from './components/Records/MedicalRecords';
import BillingManagement from './components/Billing/BillingManagement';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (searchTerm: string) => {
    // This would filter the current view based on the search term
    console.log('Searching for:', searchTerm);
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientManagement />;
      case 'doctors':
        return <DoctorManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'records':
        return <MedicalRecords />;
      case 'billing':
        return <BillingManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          toggleSidebar={toggleSidebar}
          onSearch={handleSearch}
          onNotificationClick={handleNotificationClick}
          onSettingsClick={handleSettingsClick}
          onProfileClick={handleProfileClick}
        />
        
        <main className="flex-1 p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;