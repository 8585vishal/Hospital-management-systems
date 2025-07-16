package com.medicare.hospital.service;

import com.medicare.hospital.model.Patient;
import com.medicare.hospital.repository.PatientRepository;
import com.medicare.hospital.controller.PatientController.PatientStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for Patient operations
 * 
 * This service provides business logic for patient management including:
 * - CRUD operations
 * - Search functionality
 * - Statistics calculation
 * - Data validation
 * 
 * All methods are transactional to ensure data consistency
 */
@Service
@Transactional
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    /**
     * Find all patients with pagination
     * 
     * @param pageable Pagination information
     * @return Page of patients
     */
    @Transactional(readOnly = true)
    public Page<Patient> findAll(Pageable pageable) {
        return patientRepository.findAll(pageable);
    }
    
    /**
     * Find patient by ID
     * 
     * @param id Patient ID
     * @return Optional containing patient if found
     */
    @Transactional(readOnly = true)
    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }
    
    /**
     * Save patient (create or update)
     * 
     * @param patient Patient to save
     * @return Saved patient
     */
    public Patient save(Patient patient) {
        validatePatient(patient);
        return patientRepository.save(patient);
    }
    
    /**
     * Delete patient by ID
     * 
     * @param id Patient ID
     */
    public void deleteById(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException("Patient with ID " + id + " not found");
        }
        patientRepository.deleteById(id);
    }
    
    /**
     * Check if patient exists by ID
     * 
     * @param id Patient ID
     * @return true if patient exists, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return patientRepository.existsById(id);
    }
    
    /**
     * Search patients by name or email
     * 
     * @param query Search query
     * @return List of matching patients
     */
    @Transactional(readOnly = true)
    public List<Patient> searchPatients(String query) {
        return patientRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            query, query, query);
    }
    
    /**
     * Find patients by gender
     * 
     * @param gender Patient gender
     * @return List of patients with specified gender
     */
    @Transactional(readOnly = true)
    public List<Patient> findByGender(Patient.Gender gender) {
        return patientRepository.findByGender(gender);
    }
    
    /**
     * Find patients by age range
     * 
     * @param minAge Minimum age
     * @param maxAge Maximum age
     * @return List of patients within age range
     */
    @Transactional(readOnly = true)
    public List<Patient> findByAgeRange(int minAge, int maxAge) {
        LocalDate maxBirthDate = LocalDate.now().minusYears(minAge);
        LocalDate minBirthDate = LocalDate.now().minusYears(maxAge + 1);
        return patientRepository.findByDateOfBirthBetween(minBirthDate, maxBirthDate);
    }
    
    /**
     * Find patients by insurance provider
     * 
     * @param insurance Insurance provider name
     * @return List of patients with specified insurance
     */
    @Transactional(readOnly = true)
    public List<Patient> findByInsurance(String insurance) {
        return patientRepository.findByInsuranceContainingIgnoreCase(insurance);
    }
    
    /**
     * Get patient statistics
     * 
     * @return Patient statistics object
     */
    @Transactional(readOnly = true)
    public PatientStatistics getPatientStatistics() {
        long totalPatients = patientRepository.count();
        long malePatients = patientRepository.countByGender(Patient.Gender.MALE);
        long femalePatients = patientRepository.countByGender(Patient.Gender.FEMALE);
        
        // Calculate average age
        List<Patient> allPatients = patientRepository.findAll();
        double averageAge = allPatients.stream()
            .mapToInt(Patient::getAge)
            .average()
            .orElse(0.0);
        
        return new PatientStatistics(totalPatients, malePatients, femalePatients, averageAge);
    }
    
    /**
     * Get patients with upcoming birthdays (within next 30 days)
     * 
     * @return List of patients with upcoming birthdays
     */
    @Transactional(readOnly = true)
    public List<Patient> getPatientsWithUpcomingBirthdays() {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysFromNow = today.plusDays(30);
        
        // This is a simplified version - in real implementation, you'd need more complex date logic
        return patientRepository.findAll().stream()
            .filter(patient -> {
                LocalDate birthday = patient.getDateOfBirth().withYear(today.getYear());
                return birthday.isAfter(today) && birthday.isBefore(thirtyDaysFromNow);
            })
            .toList();
    }
    
    /**
     * Validate patient data
     * 
     * @param patient Patient to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validatePatient(Patient patient) {
        if (patient.getFirstName() == null || patient.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        
        if (patient.getLastName() == null || patient.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        
        if (patient.getEmail() == null || patient.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        if (patient.getDateOfBirth() == null) {
            throw new IllegalArgumentException("Date of birth is required");
        }
        
        if (patient.getDateOfBirth().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Date of birth cannot be in the future");
        }
        
        // Check for duplicate email (excluding current patient if updating)
        Optional<Patient> existingPatient = patientRepository.findByEmail(patient.getEmail());
        if (existingPatient.isPresent() && !existingPatient.get().getId().equals(patient.getId())) {
            throw new IllegalArgumentException("Email already exists");
        }
    }
    
    /**
     * Custom exception for patient not found scenarios
     */
    public static class PatientNotFoundException extends RuntimeException {
        public PatientNotFoundException(String message) {
            super(message);
        }
    }
}