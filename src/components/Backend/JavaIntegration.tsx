import React, { useState, useEffect } from 'react';
import { Server, Database, Code, Coffee, Shield, Zap } from 'lucide-react';

const JavaIntegration: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [apiEndpoints, setApiEndpoints] = useState([
    { name: 'Patient API', status: 'active', url: '/api/patients', method: 'GET/POST/PUT/DELETE' },
    { name: 'Doctor API', status: 'active', url: '/api/doctors', method: 'GET/POST/PUT/DELETE' },
    { name: 'Appointment API', status: 'active', url: '/api/appointments', method: 'GET/POST/PUT/DELETE' },
    { name: 'Medical Records API', status: 'active', url: '/api/records', method: 'GET/POST/PUT/DELETE' },
    { name: 'Billing API', status: 'active', url: '/api/billing', method: 'GET/POST/PUT/DELETE' },
  ]);

  useEffect(() => {
    // Simulate connection to Java backend
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  }, []);

  const javaBackendCode = `
// Java Spring Boot Backend Example
@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    
    @Autowired
    private PatientService patientService;
    
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.findAll();
        return ResponseEntity.ok(patients);
    }
    
    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient savedPatient = patientService.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        Patient updatedPatient = patientService.update(id, patient);
        return ResponseEntity.ok(updatedPatient);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

// Patient Entity
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String emergencyContact;
    private String medicalHistory;
    private String insurance;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}

// Service Layer
@Service
@Transactional
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    public List<Patient> findAll() {
        return patientRepository.findAll();
    }
    
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }
    
    public Patient update(Long id, Patient patient) {
        Patient existingPatient = patientRepository.findById(id)
            .orElseThrow(() -> new PatientNotFoundException("Patient not found"));
        
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setEmail(patient.getEmail());
        // ... update other fields
        
        return patientRepository.save(existingPatient);
    }
    
    public void delete(Long id) {
        patientRepository.deleteById(id);
    }
}
  `;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-orange-50 rounded-lg">
            <Coffee className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Java Backend Integration</h2>
            <p className="text-sm text-gray-600">Spring Boot REST API Services</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
            connectionStatus === 'connecting' ? 'bg-yellow-500 animate-spin' :
            'bg-red-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-700 capitalize">{connectionStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Endpoints */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
            <Server className="h-4 w-4 mr-2 text-blue-600" />
            API Endpoints
          </h3>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{endpoint.name}</p>
                    <p className="text-sm text-gray-600">{endpoint.url}</p>
                    <p className="text-xs text-blue-600">{endpoint.method}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Features */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-purple-600" />
            Backend Features
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">MySQL Database</p>
                  <p className="text-sm text-gray-600">Relational database with JPA/Hibernate</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Spring Security</p>
                  <p className="text-sm text-gray-600">JWT authentication & authorization</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Code className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">RESTful APIs</p>
                  <p className="text-sm text-gray-600">CRUD operations for all entities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default JavaIntegration;