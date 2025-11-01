"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { Doctor } from "@/lib/types"
import { mockPatients } from "@/lib/mock-data"
import { dataStore } from "@/lib/data-store"
import { AdminHeader } from "@/components/admin-header"
import { PatientSelector } from "@/components/patient-selector"
import { AddOperationForm } from "@/components/add-operation-form"
import { AddPrescriptionForm } from "@/components/add-prescription-form"
import { PatientDataView } from "@/components/patient-data-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedPatientId, setSelectedPatientId] = useState<string>("")

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "doctor" && user.role !== "hospital"))) {
      router.push("/")
    }
    if (user) {
      dataStore.loadFromStorage()
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const doctor = user as Doctor

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <AdminHeader doctor={doctor} />
      <main className="container mx-auto max-w-4xl space-y-6 p-4 pb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {doctor.firstName}</h2>
          <p className="text-muted-foreground">
            {doctor.specialization} - {doctor.institution}
          </p>
        </div>

        <PatientSelector
          patients={mockPatients}
          selectedPatientId={selectedPatientId}
          onSelectPatient={setSelectedPatientId}
        />

        {selectedPatientId && (
          <>
            <Tabs defaultValue="view" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="view">Patient Data</TabsTrigger>
                <TabsTrigger value="operation">Operation</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <PatientDataView patientId={selectedPatientId} />
              </TabsContent>
              <TabsContent value="operation">
                <AddOperationForm patientId={selectedPatientId} doctor={doctor} />
              </TabsContent>
              <TabsContent value="prescription">
                <AddPrescriptionForm patientId={selectedPatientId} doctor={doctor} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
