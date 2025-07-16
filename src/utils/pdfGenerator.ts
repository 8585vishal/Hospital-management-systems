import jsPDF from 'jspdf';

export const generatePatientPDF = (patient: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('PATIENT REPORT', 20, 30);
  
  // Hospital Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('MediCare Hospital Management System', 20, 45);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 55);
  
  // Patient Information
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('PATIENT INFORMATION', 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 20, 90);
  doc.text(`Email: ${patient.email}`, 20, 105);
  doc.text(`Phone: ${patient.phone}`, 20, 120);
  doc.text(`Date of Birth: ${patient.dateOfBirth}`, 20, 135);
  doc.text(`Gender: ${patient.gender}`, 20, 150);
  doc.text(`Address: ${patient.address || 'Not provided'}`, 20, 165);
  doc.text(`Emergency Contact: ${patient.emergencyContact || 'Not provided'}`, 20, 180);
  
  // Medical Information
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('MEDICAL INFORMATION', 20, 200);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Insurance: ${patient.insurance || 'Not provided'}`, 20, 215);
  doc.text(`Patient ID: ${patient.id}`, 20, 230);
  
  // Medical History
  const medicalHistory = patient.medicalHistory || 'No medical history recorded';
  const splitHistory = doc.splitTextToSize(medicalHistory, 170);
  doc.text('Medical History:', 20, 245);
  doc.text(splitHistory, 20, 260);
  
  return doc;
};

export const generateMedicalRecordPDF = (record: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('MEDICAL RECORD', 20, 30);
  
  // Hospital Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('MediCare Hospital Management System', 20, 45);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 55);
  
  // Record Information
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('RECORD DETAILS', 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Record ID: ${record.id}`, 20, 90);
  doc.text(`Date: ${new Date(record.date).toLocaleDateString()}`, 20, 105);
  doc.text(`Patient: ${record.patientName}`, 20, 120);
  doc.text(`Doctor: ${record.doctorName}`, 20, 135);
  doc.text(`Diagnosis: ${record.diagnosis}`, 20, 150);
  doc.text(`Treatment: ${record.treatment}`, 20, 165);
  doc.text(`Prescription: ${record.prescription}`, 20, 180);
  
  // Notes
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('NOTES', 20, 200);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const notes = record.notes || 'No additional notes';
  const splitNotes = doc.splitTextToSize(notes, 170);
  doc.text(splitNotes, 20, 215);
  
  return doc;
};

export const generateInvoicePDF = (invoice: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('MEDICAL INVOICE', 20, 30);
  
  // Hospital Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('MediCare Hospital Management System', 20, 45);
  doc.text('123 Healthcare Ave, Medical City, MC 12345', 20, 55);
  doc.text('Phone: (555) 123-4567 | Email: billing@medicare.com', 20, 65);
  
  // Invoice Details
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('INVOICE DETAILS', 20, 85);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice ID: ${invoice.id}`, 20, 100);
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 115);
  doc.text(`Patient: ${invoice.patientName}`, 20, 130);
  doc.text(`Patient ID: ${invoice.patientId}`, 20, 145);
  doc.text(`Insurance: ${invoice.insurance}`, 20, 160);
  
  // Services
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('SERVICES PROVIDED', 20, 180);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  let yPos = 195;
  invoice.services.forEach((service: string, index: number) => {
    const serviceAmount = (invoice.amount / invoice.services.length).toFixed(2);
    doc.text(`${index + 1}. ${service} - $${serviceAmount}`, 20, yPos);
    yPos += 15;
  });
  
  // Summary
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('SUMMARY', 20, yPos + 10);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Subtotal: $${invoice.amount.toFixed(2)}`, 20, yPos + 25);
  doc.text(`Tax (8.5%): $${(invoice.amount * 0.085).toFixed(2)}`, 20, yPos + 40);
  doc.text(`Total Amount: $${(invoice.amount * 1.085).toFixed(2)}`, 20, yPos + 55);
  doc.text(`Payment Status: ${invoice.status.toUpperCase()}`, 20, yPos + 70);
  
  return doc;
};

export const generateComprehensiveReportPDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('COMPREHENSIVE HOSPITAL REPORT', 20, 30);
  
  // Hospital Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('MediCare Hospital Management System', 20, 45);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 55);
  
  // Executive Summary
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('EXECUTIVE SUMMARY', 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const summary = 'This comprehensive report provides an overview of all hospital operations, including patient care metrics, financial performance, operational efficiency, and staff performance indicators.';
  const splitSummary = doc.splitTextToSize(summary, 170);
  doc.text(splitSummary, 20, 90);
  
  // Key Performance Indicators
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('KEY PERFORMANCE INDICATORS', 20, 120);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('• Patient Satisfaction: 94%', 20, 135);
  doc.text('• Financial Performance: +12.5% growth', 20, 150);
  doc.text('• Operational Efficiency: 87% utilization', 20, 165);
  doc.text('• Staff Performance: 4.8/5.0 rating', 20, 180);
  
  // Patient Care Metrics
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text('PATIENT CARE METRICS', 20, 200);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('• Total Patients Served: 1,247', 20, 215);
  doc.text('• Average Recovery Rate: 87%', 20, 230);
  doc.text('• Patient Safety Score: 98.5%', 20, 245);
  doc.text('• Readmission Rate: 4.2%', 20, 260);
  
  return doc;
};