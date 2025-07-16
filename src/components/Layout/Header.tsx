import React from 'react';
import { useState } from 'react';
import { Bell, Search, Settings, User, Menu, Activity, Heart, Shield } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  onSearch?: (searchTerm: string) => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  onSearch, 
  onNotificationClick, 
  onSettingsClick, 
  onProfileClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
      alert(`Searching for: "${searchTerm}"\n\nThis would filter patients, doctors, and appointments containing this term.`);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
    alert('Opening Settings Panel...\n\nThis would navigate to the settings page or open a settings modal.');
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const notifications = [
    { id: 1, title: 'New Patient Registration', message: 'John Smith has been registered', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Appointment Reminder', message: 'Dr. Wilson has 3 appointments today', time: '10 min ago', type: 'warning' },
    { id: 3, title: 'System Update', message: 'System maintenance completed successfully', time: '1 hour ago', type: 'success' },
    { id: 4, title: 'Low Inventory Alert', message: 'Medical supplies running low', time: '2 hours ago', type: 'error' },
    { id: 5, title: 'Payment Received', message: 'Invoice #INV-001 has been paid', time: '3 hours ago', type: 'success' }
  ];
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg px-4 py-4 flex-shrink-0 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
          
          {/* Enhanced Logo Section */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediCare Pro</h1>
              <p className="text-xs text-blue-100">Advanced Hospital Management</p>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search patients, doctors, appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-white bg-opacity-20 backdrop-blur-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-blue-200"
            />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          {/* Live Status Indicators */}
          <div className="hidden lg:flex items-center space-x-6 mr-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-100">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm text-blue-100">24 Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-blue-100">Secure</span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-bounce">
              {notifications.length}
            </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'error' ? 'bg-red-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'success' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSettingsClick}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="h-5 w-5 text-white" />
          </button>
          
          <div className="relative">
            <button 
              onClick={handleProfileClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Dr. Sarah Johnson</p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Administrator</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    View Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Privacy Settings
                  </button>
                  <hr className="my-2" />
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;