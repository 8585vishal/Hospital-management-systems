package com.medicare.hospital.controller;

import com.medicare.hospital.model.Patient;
import com.medicare.hospital.service.PatientService;
import com.medicare.hospital.dto.PatientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Patient Management
 * 
 * Provides CRUD operations for patients including:
 * - Create new patient
 * - Retrieve patient(s)
 * - Update patient information
 * - Delete patient
 * - Search patients
 * 
 * All endpoints return JSON responses and handle proper HTTP status codes
 */
@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    
    @Autowired
    private PatientService patientService;
    
    /**
     * Get all patients with pagination support
     * 
     * @param pageable Pagination information
     * @return Page of patients
     */
    @GetMapping
    public ResponseEntity<Page<Patient>> getAllPatients(Pageable pageable) {
        try {
            Page<Patient> patients = patientService.findAll(pageable);
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get patient by ID
     * 
     * @param id Patient ID
     * @return Patient if found, 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        try {
            Optional<Patient> patient = patientService.findById(id);
            return patient.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Create new patient
     * 
     * @param patientDTO Patient data transfer object
     * @return Created patient with 201 status
     */
    @PostMapping
    public ResponseEntity<Patient> createPatient(@Valid @RequestBody PatientDTO patientDTO) {
        try {
            Patient patient = convertToEntity(patientDTO);
            Patient savedPatient = patientService.save(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    /**
     * Update existing patient
     * 
     * @param id Patient ID
     * @param patientDTO Updated patient data
     * @return Updated patient or 404 if not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, 
                                               @Valid @RequestBody PatientDTO patientDTO) {
        try {
            Optional<Patient> existingPatient = patientService.findById(id);
            if (existingPatient.isPresent()) {
                Patient patient = existingPatient.get();
                updatePatientFromDTO(patient, patientDTO);
                Patient updatedPatient = patientService.save(patient);
                return ResponseEntity.ok(updatedPatient);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    /**
     * Delete patient by ID
     * 
     * @param id Patient ID
     * @return 204 No Content if successful, 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        try {
            if (patientService.existsById(id)) {
                patientService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Search patients by name or email
     * 
     * @param query Search query
     * @return List of matching patients
     */
    @GetMapping("/search")
    public ResponseEntity<List<Patient>> searchPatients(@RequestParam String query) {
        try {
            List<Patient> patients = patientService.searchPatients(query);
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get patients by gender
     * 
     * @param gender Patient gender
     * @return List of patients with specified gender
     */
    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<Patient>> getPatientsByGender(@PathVariable Patient.Gender gender) {
        try {
            List<Patient> patients = patientService.findByGender(gender);
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get patient statistics
     * 
     * @return Patient statistics including total count, gender distribution, etc.
     */
    @GetMapping("/statistics")
    public ResponseEntity<PatientStatistics> getPatientStatistics() {
        try {
            PatientStatistics stats = patientService.getPatientStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Helper methods
    private Patient convertToEntity(PatientDTO dto) {
        Patient patient = new Patient();
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setGender(dto.getGender());
        patient.setAddress(dto.getAddress());
        patient.setEmergencyContact(dto.getEmergencyContact());
        patient.setMedicalHistory(dto.getMedicalHistory());
        patient.setInsurance(dto.getInsurance());
        return patient;
    }
    
    private void updatePatientFromDTO(Patient patient, PatientDTO dto) {
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setGender(dto.getGender());
        patient.setAddress(dto.getAddress());
        patient.setEmergencyContact(dto.getEmergencyContact());
        patient.setMedicalHistory(dto.getMedicalHistory());
        patient.setInsurance(dto.getInsurance());
    }
    
    // Inner class for patient statistics
    public static class PatientStatistics {
        private long totalPatients;
        private long malePatients;
        private long femalePatients;
        private double averageAge;
        
        // Constructors, getters, and setters
        public PatientStatistics() {}
        
        public PatientStatistics(long totalPatients, long malePatients, 
                               long femalePatients, double averageAge) {
            this.totalPatients = totalPatients;
            this.malePatients = malePatients;
            this.femalePatients = femalePatients;
            this.averageAge = averageAge;
        }
        
        // Getters and setters
        public long getTotalPatients() { return totalPatients; }
        public void setTotalPatients(long totalPatients) { this.totalPatients = totalPatients; }
        
        public long getMalePatients() { return malePatients; }
        public void setMalePatients(long malePatients) { this.malePatients = malePatients; }
        
        public long getFemalePatients() { return femalePatients; }
        public void setFemalePatients(long femalePatients) { this.femalePatients = femalePatients; }
        
        public double getAverageAge() { return averageAge; }
        public void setAverageAge(double averageAge) { this.averageAge = averageAge; }
    }
}