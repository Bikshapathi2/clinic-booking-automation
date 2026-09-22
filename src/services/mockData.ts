import type { Appointment, AutomationLog, WhatsAppMessage, WhatsAppConfig } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CB-1024',
    patient_id: 'P-101',
    patient_name: 'Rahul Kumar',
    patient_problem: 'Severe viral fever and persistent headache for 2 days',
    phone: '9876543210',
    doctor_name: 'Dr. Anil Kumar',
    doctor_specialty: 'Senior General Physician & Internal Medicine',
    doctor_qualifications: 'M.B.B.S, M.D. (General Medicine)',
    doctor_experience: '15+ Years Experience',
    appointment_date: '21 Sep 2026',
    appointment_time: '6:00 PM',
    status: 'VERIFIED',
    attendance_status: 'Attended',
    check_in_time: '5:54 PM',
    check_in_date: '21 Sep 2026',
    verification_status: 'Verified',
    whatsapp_booking_status: 'Sent',
    whatsapp_verification_status: 'Sent',
    created_at: '2026-09-21T08:30:00Z',
    notes: 'Routine health checkup and consultation.'
  },
  {
    id: 'CB-1025',
    patient_id: 'P-102',
    patient_name: 'Priya Sharma',
    patient_problem: 'Sharp toothache and lower molar sensitivity to cold food',
    phone: '9812345678',
    doctor_name: 'Dr. Sneha Reddy',
    doctor_specialty: 'Dental Specialist & Oral Surgeon',
    doctor_qualifications: 'B.D.S, M.D.S (Oral & Maxillofacial Surgery)',
    doctor_experience: '12+ Years Experience',
    appointment_date: '21 Sep 2026',
    appointment_time: '6:30 PM',
    status: 'ATTENDED',
    attendance_status: 'Attended',
    check_in_time: '6:15 PM',
    check_in_date: '21 Sep 2026',
    verification_status: 'Pending',
    whatsapp_booking_status: 'Sent',
    whatsapp_verification_status: 'Pending',
    created_at: '2026-09-21T09:15:00Z',
    notes: 'Dental consultation.'
  },
  {
    id: 'CB-1026',
    patient_id: 'P-103',
    patient_name: 'Amit Patel',
    patient_problem: 'Chest tightness and fluctuating blood pressure readings',
    phone: '9765432109',
    doctor_name: 'Dr. Rajesh Gupta',
    doctor_specialty: 'Cardiologist & Heart Specialist',
    doctor_qualifications: 'M.B.B.S, M.D., D.M. (Cardiology)',
    doctor_experience: '18+ Years Experience',
    appointment_date: '21 Sep 2026',
    appointment_time: '7:00 PM',
    status: 'BOOKED',
    attendance_status: 'Not Attended',
    verification_status: 'Pending',
    whatsapp_booking_status: 'Sent',
    whatsapp_verification_status: 'Pending',
    created_at: '2026-09-21T10:00:00Z',
    notes: 'Follow-up cardiology consultation.'
  },
  {
    id: 'CB-1027',
    patient_id: 'P-104',
    patient_name: 'Sunita Verma',
    patient_problem: 'Red skin rash and allergic itching on arm after exposure',
    phone: '9988776655',
    doctor_name: 'Dr. Kavita Sharma',
    doctor_specialty: 'Dermatologist & Skin Care Expert',
    doctor_qualifications: 'M.B.B.S, M.D. (Dermatology)',
    doctor_experience: '10+ Years Experience',
    appointment_date: '21 Sep 2026',
    appointment_time: '7:30 PM',
    status: 'BOOKED',
    attendance_status: 'Not Attended',
    verification_status: 'Pending',
    whatsapp_booking_status: 'Sent',
    whatsapp_verification_status: 'Pending',
    created_at: '2026-09-21T11:20:00Z'
  },
  {
    id: 'CB-1028',
    patient_id: 'P-105',
    patient_name: 'Vikram Singh',
    patient_problem: 'Wisdom tooth gum pain and swelling',
    phone: '9123456789',
    doctor_name: 'Dr. Sneha Reddy',
    doctor_specialty: 'Dental Specialist & Oral Surgeon',
    doctor_qualifications: 'B.D.S, M.D.S (Oral & Maxillofacial Surgery)',
    doctor_experience: '12+ Years Experience',
    appointment_date: '21 Sep 2026',
    appointment_time: '8:00 PM',
    status: 'VERIFIED',
    attendance_status: 'Attended',
    check_in_time: '7:48 PM',
    check_in_date: '21 Sep 2026',
    verification_status: 'Verified',
    whatsapp_booking_status: 'Sent',
    whatsapp_verification_status: 'Sent',
    created_at: '2026-09-21T12:00:00Z'
  }
];

export const INITIAL_LOGS: AutomationLog[] = [
  {
    id: 'LOG-001',
    appointment_id: 'CB-1024',
    patient_name: 'Rahul Kumar',
    event_type: 'APPOINTMENT_CREATED',
    description: 'Appointment CB-1024 created for Rahul Kumar. Problem: "Severe viral fever". Assigned Specialist: Dr. Anil Kumar (Internal Medicine)',
    timestamp: '21 Sep 2026, 08:32 AM'
  },
  {
    id: 'LOG-002',
    appointment_id: 'CB-1024',
    patient_name: 'Rahul Kumar',
    event_type: 'WHATSAPP_BOOKING_SENT',
    description: 'WhatsApp appointment message sent to Rahul Kumar (+91 9876543210)',
    timestamp: '21 Sep 2026, 08:32 AM'
  },
  {
    id: 'LOG-003',
    appointment_id: 'CB-1024',
    patient_name: 'Rahul Kumar',
    event_type: 'PATIENT_CHECKED_IN',
    description: 'Rahul Kumar arrived at clinic and checked in',
    timestamp: '21 Sep 2026, 05:54 PM'
  },
  {
    id: 'LOG-004',
    appointment_id: 'CB-1024',
    patient_name: 'Rahul Kumar',
    event_type: 'ATTENDANCE_VERIFIED',
    description: 'Attendance verified by clinic staff for CB-1024',
    timestamp: '21 Sep 2026, 05:54 PM'
  },
  {
    id: 'LOG-005',
    appointment_id: 'CB-1024',
    patient_name: 'Rahul Kumar',
    event_type: 'WHATSAPP_VERIFICATION_SENT',
    description: 'WhatsApp attendance verification message sent to Rahul Kumar',
    timestamp: '21 Sep 2026, 05:54 PM'
  }
];

export const INITIAL_MESSAGES: WhatsAppMessage[] = [
  {
    id: 'WA-2001',
    patient_id: 'P-101',
    patient_name: 'Rahul Kumar',
    appointment_id: 'CB-1024',
    phone: '9876543210',
    message_type: 'APPOINTMENT_CONFIRMATION',
    message: `Hello Rahul,
Your clinic appointment has been successfully booked.

Reported Concern: Severe viral fever and persistent headache for 2 days
Assigned Specialist: Dr. Anil Kumar (Senior General Physician & Internal Medicine - M.B.B.S, M.D.)
Experience: 15+ Years Experience

Date: 21 September 2026
Time: 6:00 PM
Appointment ID: CB-1024

Please visit the clinic at your scheduled time.

Thank you,
Clinic Booking`,
    status: 'Sent',
    sent_at: '21 Sep 2026, 08:32 AM'
  },
  {
    id: 'WA-2002',
    patient_id: 'P-101',
    patient_name: 'Rahul Kumar',
    appointment_id: 'CB-1024',
    phone: '9876543210',
    message_type: 'ATTENDANCE_VERIFICATION',
    message: `Hello Rahul Kumar,

Your attendance at the clinic has been successfully verified.

Appointment ID: CB-1024
Assigned Doctor: Dr. Anil Kumar (Senior General Physician)
Date: 21 September 2026
Check-in Time: 5:54 PM
Status: VERIFIED ✓

Thank you for visiting us.`,
    status: 'Sent',
    sent_at: '21 Sep 2026, 05:54 PM'
  }
];

export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  mode: 'DEMO',
  phoneNumberId: '109876543210987',
  accessToken: '',
  businessAccountId: '209876543210987',
  autoSendBookingMessage: true,
  autoSendVerificationMessage: true
};
