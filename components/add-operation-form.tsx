"use client"

import type React from "react"

import { useState } from "react"
import type { Doctor, Operation } from "@/lib/types"
import { dataStore } from "@/lib/data-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Stethoscope } from "lucide-react"

interface AddOperationFormProps {
  patientId: string
  doctor: Doctor
}

export function AddOperationForm({ patientId, doctor }: AddOperationFormProps) {
  const { toast } = useToast()
  const [operationType, setOperationType] = useState("")
  const [description, setDescription] = useState("")
  const [operationDate, setOperationDate] = useState("")
  const [outcome, setOutcome] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const operation: Omit<Operation, "id"> = {
      patientId,
      doctorId: doctor.id,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      operationType,
      description,
      operationDate: new Date(operationDate),
      hospital: doctor.institution,
      outcome,
      notes: notes || undefined,
    }

    dataStore.addOperation(operation)

    toast({
      title: "Operation added",
      description: "The operation has been successfully documented.",
    })

    setOperationType("")
    setDescription("")
    setOperationDate("")
    setOutcome("")
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Document Operation
        </CardTitle>
        <CardDescription>Add a new operation to the patient record</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="operationType">Type of Operation</Label>
            <Input
              id="operationType"
              placeholder="e.g. Appendectomy, Knee Arthroscopy"
              value={operationType}
              onChange={(e) => setOperationType(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the procedure"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operationDate">Operation Date</Label>
            <Input
              id="operationDate"
              type="date"
              value={operationDate}
              onChange={(e) => setOperationDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outcome">Outcome</Label>
            <Input
              id="outcome"
              placeholder="e.g. Successful, no complications"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Further information about the operation"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Operation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
