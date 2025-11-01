// Mock data store for the application
import type { Patient, Doctor, Allergy, Operation, Prescription } from "./types"

// Mock users
export const mockPatients: Patient[] = [
  {
    id: "patient-1",
    email: "max.mueller@example.de",
    password: "patient123",
    role: "patient",
    firstName: "Max",
    lastName: "Müller",
    dateOfBirth: new Date("1985-03-15"),
    insuranceNumber: "A123456789",
    bloodType: "A+",
    emergencyContact: {
      name: "Anna Müller",
      phone: "+49 170 1234567",
      relationship: "Ehefrau",
    },
    createdAt: new Date("2024-01-01"),
  },
]

export const mockDoctors: Doctor[] = [
  {
    id: "doctor-1",
    email: "dr.schmidt@klinik.de",
    password: "doctor123",
    role: "doctor",
    firstName: "Dr. Sarah",
    lastName: "Schmidt",
    licenseNumber: "DE-12345",
    specialization: "Allgemeinmedizin",
    institution: "Universitätsklinikum Berlin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "hospital-1",
    email: "admin@charite.de",
    password: "hospital123",
    role: "hospital",
    firstName: "Charité",
    lastName: "Berlin",
    licenseNumber: "DE-HOSP-001",
    specialization: "Universitätsklinikum",
    institution: "Charité - Universitätsmedizin Berlin",
    createdAt: new Date("2024-01-01"),
  },
]

export const mockAllergies: Allergy[] = [
  {
    id: "allergy-1",
    patientId: "patient-1",
    allergen: "Penicillin",
    severity: "severe",
    reaction: "Anaphylaxie",
    diagnosedDate: new Date("2010-05-20"),
    notes: "Sofortige Notfallbehandlung erforderlich",
  },
]

export const mockOperations: Operation[] = [
  {
    id: "operation-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    doctorName: "Dr. Sarah Schmidt",
    operationType: "Appendektomie",
    description: "Laparoskopische Entfernung des Blinddarms",
    operationDate: new Date("2023-06-15"),
    hospital: "Universitätsklinikum Berlin",
    outcome: "Erfolgreich, keine Komplikationen",
    notes: "Postoperative Erholung verlief planmäßig",
  },
]

export const mockPrescriptions: Prescription[] = [
  {
    id: "prescription-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    doctorName: "Dr. Sarah Schmidt",
    medicationName: "Ibuprofen",
    dosage: "400mg",
    frequency: "3x täglich",
    duration: "7 Tage",
    prescribedDate: new Date("2024-01-15"),
    notes: "Mit Nahrung einnehmen",
    refillsRemaining: 0,
  },
]
