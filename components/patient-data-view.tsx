"use client"

import { useEffect, useState } from "react"
import type { Allergy, Operation, Prescription } from "@/lib/types"
import { dataStore } from "@/lib/data-store"
import { mockPatients } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Stethoscope, Pill, User } from "lucide-react"

interface PatientDataViewProps {
  patientId: string
}

export function PatientDataView({ patientId }: PatientDataViewProps) {
  const [allergies, setAllergies] = useState<Allergy[]>([])
  const [operations, setOperations] = useState<Operation[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  const patient = mockPatients.find((p) => p.id === patientId)

  useEffect(() => {
    dataStore.loadFromStorage()
    setAllergies(dataStore.getAllergies(patientId))
    setOperations(dataStore.getOperations(patientId))
    setPrescriptions(dataStore.getPrescriptions(patientId))
  }, [patientId])

  if (!patient) {
    return <div>Patient not found</div>
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-100 text-red-800 border-red-200"
      case "moderate":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "mild":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "severe":
        return "Severe"
      case "moderate":
        return "Moderate"
      case "mild":
        return "Mild"
      default:
        return severity
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div>
              <span className="font-medium">Name:</span> {patient.firstName} {patient.lastName}
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span>{" "}
              {new Date(patient.dateOfBirth).toLocaleDateString("en-US")}
            </div>
            <div>
              <span className="font-medium">Insurance Number:</span> {patient.insuranceNumber}
            </div>
            {patient.bloodType && (
              <div>
                <span className="font-medium">Blood Type:</span> {patient.bloodType}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Allergies ({allergies.length})
          </CardTitle>
          <CardDescription>Patient's documented allergies</CardDescription>
        </CardHeader>
        <CardContent>
          {allergies.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No allergies documented</p>
          ) : (
            <div className="space-y-3">
              {allergies.map((allergy) => (
                <div key={allergy.id} className="rounded-lg border p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{allergy.allergen}</span>
                    <Badge className={getSeverityColor(allergy.severity)}>{getSeverityLabel(allergy.severity)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Reaction: {allergy.reaction}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Operations ({operations.length})
          </CardTitle>
          <CardDescription>Medical procedures</CardDescription>
        </CardHeader>
        <CardContent>
          {operations.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No operations documented</p>
          ) : (
            <div className="space-y-3">
              {operations.map((operation) => (
                <div key={operation.id} className="rounded-lg border p-3 space-y-1">
                  <div className="flex items-start justify-between">
                    <span className="font-semibold">{operation.operationType}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(operation.operationDate).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{operation.description}</p>
                  <p className="text-sm">
                    <span className="font-medium">Doctor:</span> {operation.doctorName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Prescriptions ({prescriptions.length})
          </CardTitle>
          <CardDescription>Prescribed medications</CardDescription>
        </CardHeader>
        <CardContent>
          {prescriptions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No prescriptions documented</p>
          ) : (
            <div className="space-y-3">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="rounded-lg border p-3 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold">{prescription.medicationName}</span>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                    <Badge variant={prescription.refillsRemaining > 0 ? "default" : "secondary"}>
                      {prescription.refillsRemaining > 0 ? `${prescription.refillsRemaining} Refills` : "No Refills"}
                    </Badge>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Frequency:</span> {prescription.frequency}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Prescribed by:</span> {prescription.doctorName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
