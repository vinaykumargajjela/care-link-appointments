export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  fees: number;
  available: boolean;
  bio: string;
  qualifications: string[];
  languages: string[];
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName?: string;
  specialization?: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  fees?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}