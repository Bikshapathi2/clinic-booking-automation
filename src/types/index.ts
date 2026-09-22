export type BookingStatus = 'BOOKED' | 'PENDING' | 'ATTENDED' | 'VERIFIED' | 'CANCELLED';
export type AttendanceStatus = 'Not Attended' | 'Attended';
export type VerificationStatus = 'Pending' | 'Verified';
export type WhatsAppStatus = 'Pending' | 'Sent' | 'Failed';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  created_at: string;
}

export interface Appointment {
  id: string; // e.g. CB-1024
  patient_id: string;
  patient_name: string;
  patient_problem: string; // Patient reported symptom/problem
  phone: string;
  doctor_name: string;
  doctor_specialty?: string;
  doctor_qualifications?: string;
  doctor_experience?: string;
  appointment_date: string; // e.g. "21 Sep 2026"
  appointment_time: string; // e.g. "6:00 PM"
  status: BookingStatus;
  attendance_status: AttendanceStatus;
  check_in_time?: string; // e.g. "5:54 PM"
  check_in_date?: string; // e.g. "21 Sep 2026"
  verification_status: VerificationStatus;
  whatsapp_booking_status: WhatsAppStatus;
  whatsapp_verification_status: WhatsAppStatus;
  created_at: string;
  notes?: string;
}

export interface WhatsAppMessage {
  id: string;
  patient_id: string;
  patient_name: string;
  appointment_id: string;
  phone: string;
  message_type: 'APPOINTMENT_CONFIRMATION' | 'ATTENDANCE_VERIFICATION';
  message: string;
  status: WhatsAppStatus;
  sent_at: string;
}

export interface AutomationLog {
  id: string;
  appointment_id: string;
  patient_name: string;
  event_type: 
    | 'APPOINTMENT_CREATED' 
    | 'WHATSAPP_BOOKING_SENT' 
    | 'PATIENT_CHECKED_IN' 
    | 'ATTENDANCE_VERIFIED' 
    | 'WHATSAPP_VERIFICATION_SENT'
    | 'APPOINTMENT_CANCELLED';
  description: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface DashboardStats {
  todaysAppointments: number;
  checkedIn: number;
  pending: number;
  verified: number;
  whatsappMessagesSent: number;
  automationSuccessRate: number;
}

export interface WhatsAppConfig {
  mode: 'DEMO' | 'PRODUCTION';
  phoneNumberId: string;
  accessToken: string;
  businessAccountId: string;
  autoSendBookingMessage: boolean;
  autoSendVerificationMessage: boolean;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}
