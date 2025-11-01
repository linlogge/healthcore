"use client"

import type { Allergy, Operation, Prescription } from "./types"
import { mockAllergies, mockOperations, mockPrescriptions } from "./mock-data"

class DataStore {
  private allergies: Allergy[] = [...mockAllergies]
  private operations: Operation[] = [...mockOperations]
  private prescriptions: Prescription[] = [...mockPrescriptions]
  private loaded = false

  getAllergies(patientId: string): Allergy[] {
    return this.allergies.filter((a) => a.patientId === patientId)
  }

  addAllergy(allergy: Omit<Allergy, "id">): Allergy {
    const newAllergy = {
      ...allergy,
      id: `allergy-${Date.now()}`,
    }
    this.allergies.push(newAllergy)
    this.saveToStorage()
    return newAllergy
  }

  deleteAllergy(id: string): void {
    this.allergies = this.allergies.filter((a) => a.id !== id)
    this.saveToStorage()
  }

  getOperations(patientId: string): Operation[] {
    return this.operations.filter((o) => o.patientId === patientId)
  }

  addOperation(operation: Omit<Operation, "id">): Operation {
    const newOperation = {
      ...operation,
      id: `operation-${Date.now()}`,
    }
    this.operations.push(newOperation)
    this.saveToStorage()
    return newOperation
  }

  getPrescriptions(patientId: string): Prescription[] {
    return this.prescriptions.filter((p) => p.patientId === patientId)
  }

  addPrescription(prescription: Omit<Prescription, "id">): Prescription {
    const newPrescription = {
      ...prescription,
      id: `prescription-${Date.now()}`,
    }
    this.prescriptions.push(newPrescription)
    this.saveToStorage()
    return newPrescription
  }

  private saveToStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("allergies", JSON.stringify(this.allergies))
      localStorage.setItem("operations", JSON.stringify(this.operations))
      localStorage.setItem("prescriptions", JSON.stringify(this.prescriptions))
    }
  }

  loadFromStorage(): void {
    if (this.loaded || typeof window === "undefined") return

    const storedAllergies = localStorage.getItem("allergies")
    const storedOperations = localStorage.getItem("operations")
    const storedPrescriptions = localStorage.getItem("prescriptions")

    if (storedAllergies) this.allergies = JSON.parse(storedAllergies)
    if (storedOperations) this.operations = JSON.parse(storedOperations)
    if (storedPrescriptions) this.prescriptions = JSON.parse(storedPrescriptions)

    this.loaded = true
  }
}

export const dataStore = new DataStore()
