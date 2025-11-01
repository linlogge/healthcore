import type { Patient } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, CreditCard, Phone, Droplet } from "lucide-react"

interface PatientInfoProps {
  patient: Patient
}

export function PatientInfo({ patient }: PatientInfoProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Date of Birth</p>
              <p className="text-sm text-muted-foreground">{formatDate(patient.dateOfBirth)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Insurance Number</p>
              <p className="text-sm text-muted-foreground">{patient.insuranceNumber}</p>
            </div>
          </div>
          {patient.bloodType && (
            <div className="flex items-start gap-3">
              <Droplet className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Blood Type</p>
                <p className="text-sm text-muted-foreground">{patient.bloodType}</p>
              </div>
            </div>
          )}
          {patient.emergencyContact && (
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Emergency Contact</p>
                <p className="text-sm text-muted-foreground">
                  {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                </p>
                <p className="text-sm text-muted-foreground">{patient.emergencyContact.phone}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
