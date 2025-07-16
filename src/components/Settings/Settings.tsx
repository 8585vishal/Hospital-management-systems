import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    department: 'Administration',
    specialization: 'Hospital Management',
    licenseNumber: 'MD-12345'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    appointmentReminders: true,
    systemAlerts: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!\n\nChanges have been saved to your account.');
  };

  const handleChangePassword = () => {
    alert('Change Password\n\nThis would open a secure password change dialog with:\n- Current password verification\n- New password requirements\n- Confirmation step');
  };

  const handleTwoFactorAuth = () => {
    alert('Two-Factor Authentication\n\nThis would guide you through:\n- QR code setup\n- Backup codes generation\n- SMS/Email verification options');
  };

  const handleActiveSessions = () => {
    alert('Active Sessions\n\nShowing all active login sessions:\n- Current session (Web - Chrome)\n- Mobile app session\n- Option to terminate sessions');
  };

  const handleBackupDatabase = () => {
    alert('Database Backup\n\nInitiating secure backup process:\n- Patient data encryption\n- HIPAA compliant storage\n- Backup verification');
  };

  const handleSystemLogs = () => {
    alert('System Logs\n\nAccessing system logs:\n- User activity logs\n- System performance metrics\n- Security audit trail');
  };

  const handleMaintenanceMode = () => {
    alert('Maintenance Mode\n\nThis would:\n- Schedule system maintenance\n- Notify all users\n- Enable safe system updates');
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-5 w-5 text-gray-600" />
            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>
              <button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => handleProfileChange('department', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email Notifications</span>
              <input 
                type="checkbox" 
                className="rounded" 
                checked={notifications.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Push Notifications</span>
              <input 
                type="checkbox" 
                className="rounded" 
                checked={notifications.pushNotifications}
                onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SMS Alerts</span>
              <input 
                type="checkbox" 
                className="rounded" 
                checked={notifications.smsAlerts}
                onChange={(e) => handleNotificationChange('smsAlerts', e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Appointment Reminders</span>
              <input 
                type="checkbox" 
                className="rounded" 
                checked={notifications.appointmentReminders}
                onChange={(e) => handleNotificationChange('appointmentReminders', e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">System Alerts</span>
              <input 
                type="checkbox" 
                className="rounded" 
                checked={notifications.systemAlerts}
                onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-3">
            <button 
              onClick={handleChangePassword}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Change Password
            </button>
            <button 
              onClick={handleTwoFactorAuth}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Two-Factor Authentication
            </button>
            <button 
              onClick={handleActiveSessions}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Active Sessions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">System</h2>
          </div>
          <div className="space-y-3">
            <button 
              onClick={handleBackupDatabase}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Backup Database
            </button>
            <button 
              onClick={handleSystemLogs}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              System Logs
            </button>
            <button 
              onClick={handleMaintenanceMode}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Maintenance Mode
            </button>
          </div>
        </div>
      </div>
      
      {/* Notification Preferences Summary */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className={`p-3 rounded-lg ${notifications.emailNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            Email: {notifications.emailNotifications ? 'Enabled' : 'Disabled'}
          </div>
          <div className={`p-3 rounded-lg ${notifications.pushNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            Push: {notifications.pushNotifications ? 'Enabled' : 'Disabled'}
          </div>
          <div className={`p-3 rounded-lg ${notifications.smsAlerts ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            SMS: {notifications.smsAlerts ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;