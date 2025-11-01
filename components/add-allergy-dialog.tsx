"use client"

import type React from "react"

import { useState } from "react"
import type { Allergy } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddAllergyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientId: string
  onAdd: (allergy: Omit<Allergy, "id">) => void
}

export function AddAllergyDialog({ open, onOpenChange, patientId, onAdd }: AddAllergyDialogProps) {
  const [allergen, setAllergen] = useState("")
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("mild")
  const [reaction, setReaction] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      patientId,
      allergen,
      severity,
      reaction,
      diagnosedDate: new Date(),
      notes: notes || undefined,
    })
    setAllergen("")
    setSeverity("mild")
    setReaction("")
    setNotes("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Allergy</DialogTitle>
          <DialogDescription>Add a new allergy to your health insurance card</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="allergen">Allergen</Label>
              <Input
                id="allergen"
                placeholder="e.g. Penicillin, Nuts, Pollen"
                value={allergen}
                onChange={(e) => setAllergen(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reaction">Reaction</Label>
              <Input
                id="reaction"
                placeholder="e.g. Rash, Shortness of breath"
                value={reaction}
                onChange={(e) => setReaction(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional information"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
