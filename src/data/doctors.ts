
import DoctorImage1 from '@/assets/doctor-image-1.jfif'
import DoctorImage2 from '@/assets/doctor-image-2.jfif'
import DoctorImage3 from '@/assets/doctor-image-3.jpg'
import DoctorImage4 from '@/assets/doctor-image-4.jfif'
import DoctorImage5 from '@/assets/doctor-image-5.jpg'
import DoctorImage6 from '@/assets/doctor-image-6.jpg'
import type { Doctor } from '@/types/doctor'

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    profileImage:DoctorImage1,
    availabilityStatus: 'Available',
    rating: 4.9,
    experience: '15+ years',
    location: 'Downtown Medical Center',
    about: 'Dr. Johnson is a board-certified cardiologist with extensive experience in interventional cardiology and heart disease prevention.',
    education: ['MD from Harvard Medical School', 'Residency at Mayo Clinic', 'Fellowship in Interventional Cardiology'],
    languages: ['English', 'Spanish'],
    consultationFee: 250,
    nextAvailable: 'Today, 2:30 PM',
    availableSlots: [
      { id: '1-1', date: '2024-01-15', time: '14:30', available: true },
      { id: '1-2', date: '2024-01-15', time: '15:00', available: true },
      { id: '1-3', date: '2024-01-16', time: '09:00', available: true },
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    profileImage: DoctorImage2,
    availabilityStatus: 'Available',
    rating: 4.8,
    experience: '12+ years',
    location: 'Skin Health Clinic',
    about: 'Specializing in medical and cosmetic dermatology with a focus on skin cancer prevention and advanced treatment techniques.',
    education: ['MD from UCLA', 'Dermatology Residency at UCSF', 'Fellowship in Mohs Surgery'],
    languages: ['English', 'Mandarin'],
    consultationFee: 200,
    nextAvailable: 'Tomorrow, 10:00 AM',
    availableSlots: [
      { id: '2-1', date: '2024-01-16', time: '10:00', available: true },
      { id: '2-2', date: '2024-01-16', time: '11:30', available: true },
      { id: '2-3', date: '2024-01-17', time: '14:00', available: true },
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    profileImage: DoctorImage3,
    availabilityStatus: 'Busy',
    rating: 4.9,
    experience: '10+ years',
    location: 'Children\'s Medical Center',
    about: 'Dedicated pediatrician focused on comprehensive child healthcare from newborns to adolescents.',
    education: ['MD from Johns Hopkins', 'Pediatric Residency at Boston Children\'s Hospital'],
    languages: ['English', 'Spanish', 'French'],
    consultationFee: 180,
    nextAvailable: 'Jan 18, 9:00 AM',
    availableSlots: [
      { id: '3-1', date: '2024-01-18', time: '09:00', available: true },
      { id: '3-2', date: '2024-01-18', time: '10:30', available: true },
      { id: '3-3', date: '2024-01-19', time: '15:00', available: true },
    ]
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialization: 'Orthopedic Surgeon',
    profileImage: DoctorImage4,
    availabilityStatus: 'Available',
    rating: 4.7,
    experience: '18+ years',
    location: 'Sports Medicine Institute',
    about: 'Expert in sports medicine and joint replacement surgery with a focus on minimally invasive techniques.',
    education: ['MD from Stanford', 'Orthopedic Surgery Residency', 'Sports Medicine Fellowship'],
    languages: ['English'],
    consultationFee: 300,
    nextAvailable: 'Today, 4:00 PM',
    availableSlots: [
      { id: '4-1', date: '2024-01-15', time: '16:00', available: true },
      { id: '4-2', date: '2024-01-16', time: '13:00', available: true },
      { id: '4-3', date: '2024-01-17', time: '11:00', available: true },
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialization: 'Psychiatrist',
    profileImage: DoctorImage5,
    availabilityStatus: 'Available',
    rating: 4.8,
    experience: '13+ years',
    location: 'Mental Health Center',
    about: 'Compassionate psychiatrist specializing in anxiety, depression, and cognitive behavioral therapy.',
    education: ['MD from Columbia', 'Psychiatry Residency at NYU', 'CBT Certification'],
    languages: ['English', 'Korean'],
    consultationFee: 220,
    nextAvailable: 'Tomorrow, 11:00 AM',
    availableSlots: [
      { id: '5-1', date: '2024-01-16', time: '11:00', available: true },
      { id: '5-2', date: '2024-01-16', time: '14:00', available: true },
      { id: '5-3', date: '2024-01-17', time: '09:30', available: true },
    ]
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialization: 'General Practitioner',
    profileImage: DoctorImage6,
    availabilityStatus: 'Offline',
    rating: 4.6,
    experience: '8+ years',
    location: 'Family Health Clinic',
    about: 'Family medicine physician providing comprehensive primary care for patients of all ages.',
    education: ['MD from University of Michigan', 'Family Medicine Residency'],
    languages: ['English', 'German'],
    consultationFee: 150,
    nextAvailable: 'Jan 19, 8:00 AM',
    availableSlots: [
      { id: '6-1', date: '2024-01-19', time: '08:00', available: true },
      { id: '6-2', date: '2024-01-19', time: '10:00', available: true },
      { id: '6-3', date: '2024-01-20', time: '14:30', available: true },
    ]
  }
];