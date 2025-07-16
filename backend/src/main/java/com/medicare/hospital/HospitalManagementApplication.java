package com.medicare.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Main Spring Boot Application for Hospital Management System
 * 
 * This application provides REST API endpoints for managing:
 * - Patients
 * - Doctors
 * - Appointments
 * - Medical Records
 * - Billing
 * 
 * @author MediCare Development Team
 * @version 1.0
 */
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class HospitalManagementApplication {
    
    public static void main(String[] args) {
        System.out.println("Starting MediCare Hospital Management System...");
        SpringApplication.run(HospitalManagementApplication.class, args);
        System.out.println("Hospital Management System is running on port 8080");
    }
}