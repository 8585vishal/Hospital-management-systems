import { useState, useEffect } from 'react';
import { DashboardStats } from '../types';
import { usePatients } from './usePatients';
import { useDoctors } from './useDoctors';
import { useAppointments } from './useAppointments';

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const { patients } = usePatients();
  const { doctors } = useDoctors();
  const { appointments } = useAppointments();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    const pendingAppointments = appointments.filter(apt => apt.status === 'scheduled');
    const completedAppointments = appointments.filter(apt => apt.status === 'completed');

    setStats({
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      todayAppointments: todayAppointments.length,
      pendingAppointments: pendingAppointments.length,
      completedAppointments: completedAppointments.length,
      revenue: completedAppointments.length * 150, // Mock revenue calculation
    });
    setLoading(false);
  }, [patients, doctors, appointments]);

  return { stats, loading };
};