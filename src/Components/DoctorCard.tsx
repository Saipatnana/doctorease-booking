import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctorId: string) => void;
  onBookAppointment: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, onViewProfile, onBookAppointment }: DoctorCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offline':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <Card className="group py-0 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(doctor.availabilityStatus)}`}>
            {doctor.availabilityStatus}
          </Badge>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {doctor.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {doctor.experience} experience
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              ${doctor.consultationFee} consultation
            </div>
          </div>

          <p className="text-sm bg-green-100 text-green-800 px-3 py-2 rounded mb-4">
            Next available: {doctor.nextAvailable}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onViewProfile(doctor.id)}
            >
              View Profile
            </Button>
            <Button
              variant="default"
              className={`flex-1 ${doctor.availabilityStatus === 'Offline' ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => onBookAppointment(doctor.id)}
              disabled={doctor.availabilityStatus === 'Offline'}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
