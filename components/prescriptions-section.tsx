import type { Prescription } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill } from "lucide-react"

interface PrescriptionsSectionProps {
  prescriptions: Prescription[]
}

export function PrescriptionsSection({ prescriptions }: PrescriptionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Prescriptions & Medications
        </CardTitle>
        <CardDescription>Your prescribed medications</CardDescription>
      </CardHeader>
      <CardContent>
        {prescriptions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No prescriptions documented</p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{prescription.medicationName}</h3>
                    <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  </div>
                  <Badge variant={prescription.refillsRemaining > 0 ? "default" : "secondary"}>
                    {prescription.refillsRemaining > 0 ? `${prescription.refillsRemaining} Refills` : "No Refills"}
                  </Badge>
                </div>
                <div className="grid gap-2 text-sm">
                  <p>
                    <span className="font-medium">Frequency:</span> {prescription.frequency}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span> {prescription.duration}
                  </p>
                  <p>
                    <span className="font-medium">Prescribed by:</span> {prescription.doctorName}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(prescription.prescribedDate).toLocaleDateString("en-US")}
                  </p>
                  {prescription.notes && (
                    <p>
                      <span className="font-medium">Notes:</span> {prescription.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
