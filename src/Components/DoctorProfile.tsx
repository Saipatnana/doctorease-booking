import { Star, MapPin, Clock, DollarSign, Award, Globe, GraduationCap } from 'lucide-react';
import type { Doctor } from '@/types/doctor';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DoctorProfileProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorProfile = ({ doctor, isOpen, onClose, onBookAppointment }: DoctorProfileProps) => {
  if (!doctor) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-success text-success-foreground';
      case 'Busy':
        return 'bg-warning text-warning-foreground';
      case 'Offline':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="w-full max-w-[100vw] lg:max-w-[90vw] max-h-[98vh] overflow-y-auto rounded-none lg:rounded-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Doctor Profile</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Doctor Image and Basic Info */}
                <div className="text-center mb-6">
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold">{doctor.name}</h2>
                  <p className="text-lg text-primary font-medium">{doctor.specialization}</p>
                  <Badge className={`mt-2 ${getStatusColor(doctor.availabilityStatus)}`}>
                    {doctor.availabilityStatus}
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-warning fill-current mr-2" />
                      <span className="text-sm">Rating</span>
                    </div>
                    <span className="font-medium">{doctor.rating}/5.0</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Experience</span>
                    </div>
                    <span className="font-medium">{doctor.experience}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Consultation</span>
                    </div>
                    <span className="font-medium">${doctor.consultationFee}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Location</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{doctor.location}</p>
                </div>

                <Separator className="my-4" />

                {/* Next Available */}
                <div className="bg-success-light p-3 rounded-lg">
                  <p className="text-sm font-medium text-success-foreground">
                    Next Available
                  </p>
                  <p className="text-sm text-success">{doctor.nextAvailable}</p>
                </div>

                {/* Book Button */}
                <Button
                  variant="default"
                  className="w-full mt-4"
                  onClick={() => onBookAppointment(doctor.id)}
                  disabled={doctor.availabilityStatus === 'Offline'}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  About Dr. {doctor.name.split(' ').pop()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {doctor.about}
                </p>
              </CardContent>
            </Card>

            {/* Education & Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Education & Credentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Languages Spoken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Available Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {doctor.availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-lg border text-center ${
                        slot.available 
                          ? 'border-success bg-success-light text-success' 
                          : 'border-muted bg-muted text-muted-foreground'
                      }`}
                    >
                      <div className="text-sm font-medium">{slot.date}</div>
                      <div className="text-xs">{slot.time}</div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="default"
                  className="w-full mt-4"
                  onClick={() => onBookAppointment(doctor.id)}
                  disabled={doctor.availabilityStatus === 'Offline'}
                >
                  Book Available Slot
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};