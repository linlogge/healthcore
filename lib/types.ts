// Database types for the digital health insurance pass system

export type UserRole = "patient" | "doctor" | "hospital"

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  createdAt: Date
}

export interface Patient extends User {
  role: "patient"
  dateOfBirth: Date
  insuranceNumber: string
  bloodType?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Doctor extends User {
  role: "doctor" | "hospital"
  licenseNumber: string
  specialization: string
  institution: string
}

export interface Allergy {
  id: string
  patientId: string
  allergen: string
  severity: "mild" | "moderate" | "severe"
  reaction: string
  diagnosedDate: Date
  notes?: string
}

export interface Operation {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  operationType: string
  description: string
  operationDate: Date
  hospital: string
  outcome: string
  notes?: string
}

export interface Prescription {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  prescribedDate: Date
  notes?: string
  refillsRemaining: number
}
