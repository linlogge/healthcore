"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { Patient, Allergy, Operation, Prescription } from "@/lib/types"
import { dataStore } from "@/lib/data-store"
import { PatientHeader } from "@/components/patient-header"
import { PatientInfo } from "@/components/patient-info"
import { AllergiesSection } from "@/components/allergies-section"
import { MedicalHistorySection } from "@/components/medical-history-section"
import { PrescriptionsSection } from "@/components/prescriptions-section"

export default function PatientDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [allergies, setAllergies] = useState<Allergy[]>([])
  const [operations, setOperations] = useState<Operation[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      router.push("/")
      return
    }

    if (user) {
      dataStore.loadFromStorage()
      setAllergies(dataStore.getAllergies(user.id))
      setOperations(dataStore.getOperations(user.id))
      setPrescriptions(dataStore.getPrescriptions(user.id))
    }
  }, [user, isLoading, router])

  const handleAddAllergy = (allergy: Omit<Allergy, "id">) => {
    const newAllergy = dataStore.addAllergy(allergy)
    setAllergies([...allergies, newAllergy])
  }

  const handleDeleteAllergy = (id: string) => {
    dataStore.deleteAllergy(id)
    setAllergies(allergies.filter((a) => a.id !== id))
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Laden...</div>
      </div>
    )
  }

  const patient = user as Patient

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <PatientHeader patient={patient} />
      <main className="container mx-auto max-w-6xl space-y-6 p-4 pb-8">
        <PatientInfo patient={patient} />
        <AllergiesSection
          allergies={allergies}
          patientId={patient.id}
          onAddAllergy={handleAddAllergy}
          onDeleteAllergy={handleDeleteAllergy}
        />
        <MedicalHistorySection operations={operations} />
        <PrescriptionsSection prescriptions={prescriptions} />
      </main>
    </div>
  )
}
