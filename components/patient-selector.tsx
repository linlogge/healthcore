"use client"

import type { Patient } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users } from "lucide-react"

interface PatientSelectorProps {
  patients: Patient[]
  selectedPatientId: string
  onSelectPatient: (patientId: string) => void
}

export function PatientSelector({ patients, selectedPatientId, onSelectPatient }: PatientSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Select Patient
        </CardTitle>
        <CardDescription>Choose a patient to add data</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedPatientId} onValueChange={onSelectPatient}>
          <SelectTrigger>
            <SelectValue placeholder="Select patient..." />
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName} - {patient.insuranceNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
