export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availabilityStatus: 'Available' | 'Busy' | 'Offline';
  rating: number;
  experience: string;
  location: string;
  about: string;
  education: string[];
  languages: string[];
  consultationFee: number;
  nextAvailable: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export interface AppointmentForm {
  patientName: string;
  patientEmail: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
}