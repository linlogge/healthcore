import type { Operation } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

interface MedicalHistorySectionProps {
  operations: Operation[]
}

export function MedicalHistorySection({ operations }: MedicalHistorySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Operations & Procedures
        </CardTitle>
        <CardDescription>Your medical history</CardDescription>
      </CardHeader>
      <CardContent>
        {operations.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No operations documented</p>
        ) : (
          <div className="space-y-4">
            {operations.map((operation) => (
              <div key={operation.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{operation.operationType}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(operation.operationDate).toLocaleDateString("en-US")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{operation.description}</p>
                <div className="grid gap-2 text-sm">
                  <p>
                    <span className="font-medium">Doctor:</span> {operation.doctorName}
                  </p>
                  <p>
                    <span className="font-medium">Hospital:</span> {operation.hospital}
                  </p>
                  <p>
                    <span className="font-medium">Outcome:</span> {operation.outcome}
                  </p>
                  {operation.notes && (
                    <p>
                      <span className="font-medium">Notes:</span> {operation.notes}
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
