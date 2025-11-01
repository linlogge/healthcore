"use client"

import { useState } from "react"
import type { Allergy } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Plus, Trash2 } from "lucide-react"
import { AddAllergyDialog } from "@/components/add-allergy-dialog"

interface AllergiesSectionProps {
  allergies: Allergy[]
  patientId: string
  onAddAllergy: (allergy: Omit<Allergy, "id">) => void
  onDeleteAllergy: (id: string) => void
}

export function AllergiesSection({ allergies, patientId, onAddAllergy, onDeleteAllergy }: AllergiesSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Allergies
              </CardTitle>
              <CardDescription>Your documented allergies and intolerances</CardDescription>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Allergy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {allergies.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No allergies documented</p>
          ) : (
            <div className="space-y-4">
              {allergies.map((allergy) => (
                <div key={allergy.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{allergy.allergen}</h3>
                      <Badge className={getSeverityColor(allergy.severity)}>{getSeverityLabel(allergy.severity)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Reaction:</span> {allergy.reaction}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Diagnosed:</span>{" "}
                      {new Date(allergy.diagnosedDate).toLocaleDateString("en-US")}
                    </p>
                    {allergy.notes && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Notes:</span> {allergy.notes}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onDeleteAllergy(allergy.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddAllergyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} patientId={patientId} onAdd={onAddAllergy} />
    </>
  )
}
