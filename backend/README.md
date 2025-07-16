# MediCare Hospital Management System - Java Backend

## Overview
This is the Java Spring Boot backend for the MediCare Hospital Management System. It provides RESTful APIs for managing patients, doctors, appointments, medical records, and billing.

## Technology Stack
- **Java 11**
- **Spring Boot 2.7.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL Database**
- **Maven**
- **JWT Authentication**
- **Swagger/OpenAPI Documentation**

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/medicare/hospital/
│   │   │       ├── HospitalManagementApplication.java
│   │   │       ├── controller/
│   │   │       │   └── PatientController.java
│   │   │       ├── service/
│   │   │       │   └── PatientService.java
│   │   │       ├── repository/
│   │   │       │   └── PatientRepository.java
│   │   │       ├── model/
│   │   │       │   └── Patient.java
│   │   │       └── dto/
│   │   │           └── PatientDTO.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Features
- **Patient Management**: CRUD operations for patient records
- **RESTful APIs**: Complete REST API endpoints
- **Data Validation**: Input validation using Bean Validation
- **Database Integration**: MySQL with JPA/Hibernate
- **Security**: JWT-based authentication
- **Documentation**: Swagger/OpenAPI integration
- **Error Handling**: Comprehensive error handling
- **Pagination**: Support for paginated results
- **Search**: Advanced search capabilities

## API Endpoints

### Patient Management
- `GET /api/patients` - Get all patients (paginated)
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient
- `GET /api/patients/search?query={query}` - Search patients
- `GET /api/patients/gender/{gender}` - Get patients by gender
- `GET /api/patients/statistics` - Get patient statistics

## Database Schema

### Patient Table
```sql
CREATE TABLE patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    date_of_birth DATE NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    address TEXT,
    emergency_contact VARCHAR(200),
    medical_history TEXT,
    insurance VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Setup Instructions

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- MySQL 8.0+

### Installation
1. Clone the repository
2. Navigate to the backend directory
3. Configure database connection in `application.properties`
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Database Configuration
Update `application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Testing
Run tests using Maven:
```bash
mvn test
```

## API Documentation
Once the application is running, access Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

## Key Java Concepts Demonstrated

### 1. Object-Oriented Programming
- **Encapsulation**: Private fields with public getters/setters
- **Inheritance**: Extending JpaRepository
- **Polymorphism**: Interface implementations

### 2. Spring Framework Features
- **Dependency Injection**: @Autowired annotations
- **Inversion of Control**: Spring container management
- **Aspect-Oriented Programming**: @Transactional annotations

### 3. JPA/Hibernate
- **Entity Mapping**: @Entity, @Table, @Column annotations
- **Relationships**: @OneToMany, @ManyToOne mappings
- **Query Methods**: Custom repository methods

### 4. Exception Handling
- **Custom Exceptions**: PatientNotFoundException
- **Global Exception Handler**: @ControllerAdvice
- **Validation**: @Valid annotations

### 5. Design Patterns
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer objects
- **Service Layer Pattern**: Business logic separation

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.