"use client"

import type React from "react"

import { useState } from "react"
import type { Doctor, Prescription } from "@/lib/types"
import { dataStore } from "@/lib/data-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Pill } from "lucide-react"

interface AddPrescriptionFormProps {
  patientId: string
  doctor: Doctor
}

export function AddPrescriptionForm({ patientId, doctor }: AddPrescriptionFormProps) {
  const { toast } = useToast()
  const [medicationName, setMedicationName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [duration, setDuration] = useState("")
  const [refills, setRefills] = useState("0")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const prescription: Omit<Prescription, "id"> = {
      patientId,
      doctorId: doctor.id,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      medicationName,
      dosage,
      frequency,
      duration,
      prescribedDate: new Date(),
      notes: notes || undefined,
      refillsRemaining: Number.parseInt(refills),
    }

    dataStore.addPrescription(prescription)

    toast({
      title: "Prescription issued",
      description: "The prescription has been successfully created.",
    })

    setMedicationName("")
    setDosage("")
    setFrequency("")
    setDuration("")
    setRefills("0")
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Issue Prescription
        </CardTitle>
        <CardDescription>Create a new prescription for the patient</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="medicationName">Medication Name</Label>
            <Input
              id="medicationName"
              placeholder="e.g. Ibuprofen, Amoxicillin"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g. 400mg, 10ml"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Input
                id="frequency"
                placeholder="e.g. 3x daily"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g. 7 days, 2 weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refills">Refills</Label>
              <Input
                id="refills"
                type="number"
                min="0"
                value={refills}
                onChange={(e) => setRefills(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="e.g. Take with food, Before bedtime"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Issue Prescription
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
