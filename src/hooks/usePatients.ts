import { useState, useEffect } from 'react';
import { Patient } from '../types';

const STORAGE_KEY = 'hospital_patients';

const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    medicalHistory: 'Hypertension, Type 2 Diabetes',
    insurance: 'Blue Cross Blue Shield',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1990-03-22',
    gender: 'female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Mike Johnson - (555) 876-5432',
    medicalHistory: 'Asthma, Allergies to penicillin',
    insurance: 'Aetna',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-21T11:20:00Z',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine St, City, State 12345',
    emergencyContact: 'Lisa Brown - (555) 765-4321',
    medicalHistory: 'No significant medical history',
    insurance: 'Cigna',
    createdAt: '2024-01-17T13:45:00Z',
    updatedAt: '2024-01-22T16:30:00Z',
  },
];

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPatients = localStorage.getItem(STORAGE_KEY);
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    } else {
      setPatients(mockPatients);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPatients));
    }
    setLoading(false);
  }, []);

  const savePatients = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPatients));
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPatients = [...patients, newPatient];
    savePatients(updatedPatients);
  };

  const updatePatient = (id: string, patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedPatients = patients.map(patient =>
      patient.id === id
        ? { ...patient, ...patientData, updatedAt: new Date().toISOString() }
        : patient
    );
    savePatients(updatedPatients);
  };

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    savePatients(updatedPatients);
  };

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient,
  };
};