import { Doctor } from '../types';
import doctorSarah from '../assets/doctor-sarah.jpg';
import doctorJames from '../assets/doctor-james.jpg';
import doctorEmily from '../assets/doctor-emily.jpg';
import doctorMichael from '../assets/doctor-michael.jpg';
import doctorLisa from '../assets/doctor-lisa.jpg';
import doctorRobert from '../assets/doctor-robert.jpg';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Medicine',
    image: doctorSarah,
    experience: 8,
    rating: 4.8,
    reviews: 127,
    location: 'Downtown Medical Center',
    fees: 150,
    available: true,
    bio: 'Dr. Sarah Johnson is a dedicated general practitioner with over 8 years of experience in providing comprehensive healthcare services. She specializes in preventive care, chronic disease management, and family medicine.',
    qualifications: ['MBBS', 'MD General Medicine', 'Board Certified'],
    languages: ['English', 'Spanish', 'French'],
    availableSlots: [
      { id: '1-1', time: '09:00 AM', date: '2024-08-05', available: true },
      { id: '1-2', time: '10:00 AM', date: '2024-08-05', available: true },
      { id: '1-3', time: '11:00 AM', date: '2024-08-05', available: false },
      { id: '1-4', time: '02:00 PM', date: '2024-08-05', available: true },
      { id: '1-5', time: '03:00 PM', date: '2024-08-05', available: true },
      { id: '1-6', time: '04:00 PM', date: '2024-08-05', available: true },
    ]
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialization: 'Cardiologist',
    image: doctorJames,
    experience: 15,
    rating: 4.9,
    reviews: 203,
    location: 'Heart Care Institute',
    fees: 300,
    available: true,
    bio: 'Dr. James Wilson is a renowned cardiologist with 15 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed over 2000 successful procedures.',
    qualifications: ['MBBS', 'MD Cardiology', 'Fellowship in Interventional Cardiology'],
    languages: ['English', 'German'],
    availableSlots: [
      { id: '2-1', time: '08:00 AM', date: '2024-08-06', available: true },
      { id: '2-2', time: '09:00 AM', date: '2024-08-06', available: true },
      { id: '2-3', time: '10:00 AM', date: '2024-08-06', available: true },
      { id: '2-4', time: '01:00 PM', date: '2024-08-06', available: false },
      { id: '2-5', time: '02:00 PM', date: '2024-08-06', available: true },
      { id: '2-6', time: '03:00 PM', date: '2024-08-06', available: true },
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrician',
    image: doctorEmily,
    experience: 10,
    rating: 4.7,
    reviews: 156,
    location: 'Children\'s Medical Center',
    fees: 200,
    available: true,
    bio: 'Dr. Emily Chen is a compassionate pediatrician dedicated to providing exceptional care for children from infancy through adolescence. She has extensive experience in developmental pediatrics and childhood nutrition.',
    qualifications: ['MBBS', 'MD Pediatrics', 'Fellowship in Developmental Pediatrics'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    availableSlots: [
      { id: '3-1', time: '09:00 AM', date: '2024-08-05', available: true },
      { id: '3-2', time: '10:30 AM', date: '2024-08-05', available: true },
      { id: '3-3', time: '11:30 AM', date: '2024-08-05', available: true },
      { id: '3-4', time: '02:30 PM', date: '2024-08-05', available: true },
      { id: '3-5', time: '03:30 PM', date: '2024-08-05', available: false },
      { id: '3-6', time: '04:30 PM', date: '2024-08-05', available: true },
    ]
  },
  {
    id: '4',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Orthopedic Surgeon',
    image: doctorMichael,
    experience: 12,
    rating: 4.8,
    reviews: 98,
    location: 'Orthopedic Specialty Clinic',
    fees: 400,
    available: true,
    bio: 'Dr. Michael Rodriguez is a skilled orthopedic surgeon specializing in sports medicine and joint replacement surgery. He has helped thousands of patients regain mobility and return to active lifestyles.',
    qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship in Sports Medicine'],
    languages: ['English', 'Spanish', 'Portuguese'],
    availableSlots: [
      { id: '4-1', time: '08:00 AM', date: '2024-08-07', available: true },
      { id: '4-2', time: '09:30 AM', date: '2024-08-07', available: true },
      { id: '4-3', time: '11:00 AM', date: '2024-08-07', available: false },
      { id: '4-4', time: '01:30 PM', date: '2024-08-07', available: true },
      { id: '4-5', time: '03:00 PM', date: '2024-08-07', available: true },
      { id: '4-6', time: '04:30 PM', date: '2024-08-07', available: true },
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Dermatologist',
    image: doctorLisa,
    experience: 9,
    rating: 4.9,
    reviews: 142,
    location: 'Skin Care Center',
    fees: 250,
    available: true,
    bio: 'Dr. Lisa Thompson is a board-certified dermatologist with expertise in both medical and cosmetic dermatology. She specializes in skin cancer detection, acne treatment, and anti-aging procedures.',
    qualifications: ['MBBS', 'MD Dermatology', 'Fellowship in Cosmetic Dermatology'],
    languages: ['English', 'Italian'],
    availableSlots: [
      { id: '5-1', time: '09:00 AM', date: '2024-08-08', available: true },
      { id: '5-2', time: '10:15 AM', date: '2024-08-08', available: true },
      { id: '5-3', time: '11:30 AM', date: '2024-08-08', available: true },
      { id: '5-4', time: '02:00 PM', date: '2024-08-08', available: true },
      { id: '5-5', time: '03:15 PM', date: '2024-08-08', available: true },
      { id: '5-6', time: '04:30 PM', date: '2024-08-08', available: false },
    ]
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: 'Neurologist',
    image: doctorRobert,
    experience: 14,
    rating: 4.8,
    reviews: 89,
    location: 'Neuroscience Institute',
    fees: 350,
    available: true,
    bio: 'Dr. Robert Kim is a distinguished neurologist with extensive experience in treating neurological disorders. He specializes in epilepsy, stroke, and movement disorders, providing cutting-edge treatment options.',
    qualifications: ['MBBS', 'MD Neurology', 'Fellowship in Epilepsy'],
    languages: ['English', 'Korean', 'Japanese'],
    availableSlots: [
      { id: '6-1', time: '08:30 AM', date: '2024-08-09', available: true },
      { id: '6-2', time: '10:00 AM', date: '2024-08-09', available: true },
      { id: '6-3', time: '11:30 AM', date: '2024-08-09', available: true },
      { id: '6-4', time: '01:00 PM', date: '2024-08-09', available: false },
      { id: '6-5', time: '02:30 PM', date: '2024-08-09', available: true },
      { id: '6-6', time: '04:00 PM', date: '2024-08-09', available: true },
    ]
  }
];