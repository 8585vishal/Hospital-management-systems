import { useState, useEffect } from 'react';
import { Appointment } from '../types';

const STORAGE_KEY = 'hospital_appointments';

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'scheduled',
    reason: 'Regular checkup',
    notes: 'Patient complains of chest pain',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2024-01-25',
    time: '2:00 PM',
    status: 'completed',
    reason: 'Follow-up consultation',
    notes: 'Medication adjustment needed',
    createdAt: '2024-01-21T09:15:00Z',
    updatedAt: '2024-01-25T14:30:00Z',
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2024-01-26',
    time: '11:30 AM',
    status: 'scheduled',
    reason: 'Headache consultation',
    notes: 'Recurring headaches for 2 weeks',
    createdAt: '2024-01-22T16:45:00Z',
    updatedAt: '2024-01-22T16:45:00Z',
  },
];

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAppointments = localStorage.getItem(STORAGE_KEY);
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      setAppointments(mockAppointments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAppointments));
    }
    setLoading(false);
  }, []);

  const saveAppointments = (updatedAppointments: Appointment[]) => {
    setAppointments(updatedAppointments);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
  };

  const updateAppointment = (id: string, appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, ...appointmentData, updatedAt: new Date().toISOString() }
        : appointment
    );
    saveAppointments(updatedAppointments);
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    saveAppointments(updatedAppointments);
  };

  return {
    appointments,
    loading,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};