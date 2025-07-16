import { useState, useEffect } from 'react';
import { Doctor } from '../types';

const STORAGE_KEY = 'hospital_doctors';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Wilson',
    email: 'emily.wilson@hospital.com',
    phone: '+1 (555) 111-2222',
    specialization: 'Cardiology',
    department: 'Cardiac Surgery',
    experience: 15,
    qualification: 'MD, FACC',
    schedule: 'Monday-Friday 8:00 AM - 5:00 PM',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.martinez@hospital.com',
    phone: '+1 (555) 222-3333',
    specialization: 'Pediatrics',
    department: 'Pediatric Medicine',
    experience: 12,
    qualification: 'MD, FAAP',
    schedule: 'Monday-Friday 9:00 AM - 6:00 PM',
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-21T11:45:00Z',
  },
  {
    id: '3',
    firstName: 'Jennifer',
    lastName: 'Davis',
    email: 'jennifer.davis@hospital.com',
    phone: '+1 (555) 333-4444',
    specialization: 'Neurology',
    department: 'Neuroscience',
    experience: 20,
    qualification: 'MD, PhD, FAAN',
    schedule: 'Monday-Thursday 7:00 AM - 4:00 PM',
    createdAt: '2024-01-12T07:30:00Z',
    updatedAt: '2024-01-22T13:15:00Z',
  },
];

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDoctors = localStorage.getItem(STORAGE_KEY);
    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors));
    } else {
      setDoctors(mockDoctors);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDoctors));
    }
    setLoading(false);
  }, []);

  const saveDoctors = (updatedDoctors: Doctor[]) => {
    setDoctors(updatedDoctors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDoctors));
  };

  const addDoctor = (doctorData: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedDoctors = [...doctors, newDoctor];
    saveDoctors(updatedDoctors);
  };

  const updateDoctor = (id: string, doctorData: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedDoctors = doctors.map(doctor =>
      doctor.id === id
        ? { ...doctor, ...doctorData, updatedAt: new Date().toISOString() }
        : doctor
    );
    saveDoctors(updatedDoctors);
  };

  const deleteDoctor = (id: string) => {
    const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
    saveDoctors(updatedDoctors);
  };

  return {
    doctors,
    loading,
    addDoctor,
    updateDoctor,
    deleteDoctor,
  };
};