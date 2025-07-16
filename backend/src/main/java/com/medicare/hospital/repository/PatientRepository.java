package com.medicare.hospital.repository;

import com.medicare.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Patient entity
 * 
 * Extends JpaRepository to provide CRUD operations and custom query methods
 * for patient data access. Spring Data JPA automatically implements
 * these methods at runtime.
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    /**
     * Find patient by email address
     * 
     * @param email Patient email
     * @return Optional containing patient if found
     */
    Optional<Patient> findByEmail(String email);
    
    /**
     * Find patients by first name (case insensitive)
     * 
     * @param firstName First name to search for
     * @return List of patients with matching first name
     */
    List<Patient> findByFirstNameIgnoreCase(String firstName);
    
    /**
     * Find patients by last name (case insensitive)
     * 
     * @param lastName Last name to search for
     * @return List of patients with matching last name
     */
    List<Patient> findByLastNameIgnoreCase(String lastName);
    
    /**
     * Find patients by gender
     * 
     * @param gender Patient gender
     * @return List of patients with specified gender
     */
    List<Patient> findByGender(Patient.Gender gender);
    
    /**
     * Count patients by gender
     * 
     * @param gender Patient gender
     * @return Number of patients with specified gender
     */
    long countByGender(Patient.Gender gender);
    
    /**
     * Find patients by date of birth range
     * 
     * @param startDate Start date (inclusive)
     * @param endDate End date (inclusive)
     * @return List of patients born within the date range
     */
    List<Patient> findByDateOfBirthBetween(LocalDate startDate, LocalDate endDate);
    
    /**
     * Find patients by insurance provider (case insensitive, partial match)
     * 
     * @param insurance Insurance provider name
     * @return List of patients with matching insurance
     */
    List<Patient> findByInsuranceContainingIgnoreCase(String insurance);
    
    /**
     * Search patients by name or email (case insensitive, partial match)
     * 
     * @param firstName First name search term
     * @param lastName Last name search term
     * @param email Email search term
     * @return List of patients matching any of the search criteria
     */
    List<Patient> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        String firstName, String lastName, String email);
    
    /**
     * Find patients by phone number
     * 
     * @param phone Phone number to search for
     * @return List of patients with matching phone number
     */
    List<Patient> findByPhoneContaining(String phone);
    
    /**
     * Find patients created within a date range
     * 
     * @param startDate Start date
     * @param endDate End date
     * @return List of patients created within the date range
     */
    @Query("SELECT p FROM Patient p WHERE p.createdAt BETWEEN :startDate AND :endDate")
    List<Patient> findPatientsCreatedBetween(@Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
    
    /**
     * Find patients with medical history containing specific condition
     * 
     * @param condition Medical condition to search for
     * @return List of patients with the specified condition in their medical history
     */
    @Query("SELECT p FROM Patient p WHERE p.medicalHistory LIKE %:condition%")
    List<Patient> findPatientsWithCondition(@Param("condition") String condition);
    
    /**
     * Get patient count by age group
     * 
     * @return List of age group statistics
     */
    @Query("SELECT " +
           "CASE " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) < 18 THEN 'Under 18' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 18 AND 30 THEN '18-30' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 31 AND 50 THEN '31-50' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 51 AND 70 THEN '51-70' " +
           "  ELSE 'Over 70' " +
           "END as ageGroup, " +
           "COUNT(p) as count " +
           "FROM Patient p " +
           "GROUP BY " +
           "CASE " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) < 18 THEN 'Under 18' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 18 AND 30 THEN '18-30' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 31 AND 50 THEN '31-50' " +
           "  WHEN YEAR(CURRENT_DATE) - YEAR(p.dateOfBirth) BETWEEN 51 AND 70 THEN '51-70' " +
           "  ELSE 'Over 70' " +
           "END")
    List<Object[]> getPatientCountByAgeGroup();
    
    /**
     * Find patients without insurance
     * 
     * @return List of patients with no insurance information
     */
    @Query("SELECT p FROM Patient p WHERE p.insurance IS NULL OR p.insurance = ''")
    List<Patient> findPatientsWithoutInsurance();
    
    /**
     * Find recently registered patients (within last 30 days)
     * 
     * @return List of recently registered patients
     */
    @Query("SELECT p FROM Patient p WHERE p.createdAt >= :thirtyDaysAgo ORDER BY p.createdAt DESC")
    List<Patient> findRecentlyRegisteredPatients(@Param("thirtyDaysAgo") LocalDate thirtyDaysAgo);
    
    /**
     * Check if email exists (for validation)
     * 
     * @param email Email to check
     * @return true if email exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Check if phone number exists (for validation)
     * 
     * @param phone Phone number to check
     * @return true if phone exists, false otherwise
     */
    boolean existsByPhone(String phone);
}