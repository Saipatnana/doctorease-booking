import { useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import type { AppointmentForm, Doctor, TimeSlot } from "@/types/doctor";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface AppointmentBookingProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

const AppointmentBooking = ({
  doctor,
  isOpen,
  onClose,
  onBookingSuccess,
}: AppointmentBookingProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<AppointmentForm>({
    patientName: "",
    patientEmail: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setFormData((prev) => ({ ...prev, date: slot.date, time: slot.time }));
  };

  const handleChange = (field: keyof AppointmentForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.patientName.trim()) {
      toast.error("Full Name is required.");
      return false;
    }
    if (!formData.patientEmail.includes("@")) {
      toast.error("Enter a valid email.");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required.");
      return false;
    }
    if (!selectedSlot) {
      toast.error("Select a time slot.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500)); // Simulate API call

      toast.success(
        `Your appointment with ${doctor?.name} is booked on ${formData.date} at ${formData.time}.`
      );

      onBookingSuccess();

      // Reset before closing
      setFormData({
        patientName: "",
        patientEmail: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      });
      setSelectedSlot(null);

      onClose();
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[100vw] lg:max-w-4xl max-h-[98vh] overflow-y-auto rounded-none lg:rounded-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Doctor Info & Slots */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-primary">{doctor.specialization}</p>
                  <p className="text-sm text-muted-foreground">
                    {doctor.location}
                  </p>
                </div>
              </div>

              <div className="text-lg font-medium text-primary">
                Fee: ${doctor.consultationFee}
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Select a Time Slot
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={
                        selectedSlot?.id === slot.id ? "default" : "outline"
                      }
                      onClick={() => handleSlotSelect(slot)}
                      disabled={!slot.available}
                      className="justify-start text-left p-3 h-auto"
                    >
                      <div>
                        <div className="font-medium">{slot.date}</div>
                        <div className="text-sm">{slot.time}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Patient Form */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Patient Details
              </h4>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name *
                </label>
                <Input
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleChange("patientEmail", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Phone *
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 555 123 4567"
                />
              </div>

              {selectedSlot && (
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    {selectedSlot.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {selectedSlot.time}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium block mb-1">Notes</label>
                <Textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Optional message or symptoms..."
                />
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={isSubmitting || !selectedSlot}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBooking;
