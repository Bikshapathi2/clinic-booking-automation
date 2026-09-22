import { useState, useEffect } from 'react';
import type { Appointment, AutomationLog, WhatsAppMessage, WhatsAppConfig, DashboardStats } from '../types';
import { INITIAL_APPOINTMENTS, INITIAL_LOGS, INITIAL_MESSAGES, DEFAULT_WHATSAPP_CONFIG } from './mockData';
import { autoAssignDoctor } from './doctorMatcher';

const LOCAL_STORAGE_KEY_APPOINTMENTS = 'clinic_booking_appointments_v1';
const LOCAL_STORAGE_KEY_LOGS = 'clinic_booking_logs_v1';
const LOCAL_STORAGE_KEY_MESSAGES = 'clinic_booking_messages_v1';
const LOCAL_STORAGE_KEY_CONFIG = 'clinic_booking_config_v1';

export function formatCurrentTimestamp(): { dateStr: string; timeStr: string; fullStr: string } {
  const now = new Date();
  const day = now.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  const dateStr = `${day} ${month} ${year}`;
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  
  return {
    dateStr,
    timeStr,
    fullStr: `${dateStr}, ${timeStr}`
  };
}

export function useClinicStore() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_APPOINTMENTS);
    return stored ? JSON.parse(stored) : INITIAL_APPOINTMENTS;
  });

  const [logs, setLogs] = useState<AutomationLog[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
    return stored ? JSON.parse(stored) : INITIAL_LOGS;
  });

  const [messages, setMessages] = useState<WhatsAppMessage[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_MESSAGES);
    return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
  });

  const [whatsappConfig, setWhatsappConfig] = useState<WhatsAppConfig>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
    return stored ? JSON.parse(stored) : DEFAULT_WHATSAPP_CONFIG;
  });

  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number | null>(null);
  const [isSimulatingWorkflow, setIsSimulatingWorkflow] = useState<boolean>(false);
  const [latestWhatsAppNotification, setLatestWhatsAppNotification] = useState<WhatsAppMessage | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(whatsappConfig));
  }, [whatsappConfig]);

  const stats: DashboardStats = {
    todaysAppointments: appointments.length,
    checkedIn: appointments.filter(a => a.attendance_status === 'Attended').length,
    pending: appointments.filter(a => a.status === 'BOOKED' || a.status === 'PENDING').length,
    verified: appointments.filter(a => a.verification_status === 'Verified').length,
    whatsappMessagesSent: messages.length,
    automationSuccessRate: 99.8
  };

  const markAsAttended = (appointmentId: string): Appointment | null => {
    const appt = appointments.find(a => a.id === appointmentId);
    if (!appt) return null;

    const { dateStr, timeStr, fullStr } = formatCurrentTimestamp();

    const updatedAppt: Appointment = {
      ...appt,
      status: 'VERIFIED',
      attendance_status: 'Attended',
      check_in_time: timeStr,
      check_in_date: dateStr,
      verification_status: 'Verified',
      whatsapp_verification_status: 'Sent'
    };

    const waMessageContent = `Hello ${appt.patient_name},

Your attendance at the clinic has been successfully verified.

Appointment ID: ${appt.id}
Assigned Doctor: ${appt.doctor_name} (${appt.doctor_specialty || 'Specialist'})
Date: ${appt.appointment_date}
Check-in Time: ${timeStr}
Status: VERIFIED ✓

Thank you for visiting us.`;

    const newWAMessage: WhatsAppMessage = {
      id: `WA-${Date.now().toString().slice(-5)}`,
      patient_id: appt.patient_id,
      patient_name: appt.patient_name,
      appointment_id: appt.id,
      phone: appt.phone,
      message_type: 'ATTENDANCE_VERIFICATION',
      message: waMessageContent,
      status: 'Sent',
      sent_at: fullStr
    };

    const checkInLog: AutomationLog = {
      id: `LOG-${Date.now()}-1`,
      appointment_id: appt.id,
      patient_name: appt.patient_name,
      event_type: 'PATIENT_CHECKED_IN',
      description: `${appt.patient_name} (${appt.id}) checked in at clinic staff counter`,
      timestamp: fullStr
    };

    const verifiedLog: AutomationLog = {
      id: `LOG-${Date.now()}-2`,
      appointment_id: appt.id,
      patient_name: appt.patient_name,
      event_type: 'ATTENDANCE_VERIFIED',
      description: `Attendance automatically VERIFIED for ${appt.patient_name} at ${timeStr}`,
      timestamp: fullStr
    };

    const waLog: AutomationLog = {
      id: `LOG-${Date.now()}-3`,
      appointment_id: appt.id,
      patient_name: appt.patient_name,
      event_type: 'WHATSAPP_VERIFICATION_SENT',
      description: `WhatsApp attendance verification message delivered to ${appt.patient_name} (+91 ${appt.phone})`,
      timestamp: fullStr
    };

    setAppointments(prev => prev.map(a => a.id === appointmentId ? updatedAppt : a));
    setMessages(prev => [newWAMessage, ...prev]);
    setLogs(prev => [waLog, verifiedLog, checkInLog, ...prev]);
    setLatestWhatsAppNotification(newWAMessage);

    return updatedAppt;
  };

  const addAppointment = (newApptData: {
    patient_name: string;
    phone: string;
    patient_problem: string;
    appointment_date: string;
    appointment_time: string;
    notes?: string;
  }) => {
    const nextIdNumber = appointments.length + 1024;
    const apptId = `CB-${nextIdNumber}`;
    const { fullStr } = formatCurrentTimestamp();

    // Auto assign specialist doctor based on problem
    const { doctor } = autoAssignDoctor(newApptData.patient_problem);

    const createdAppt: Appointment = {
      ...newApptData,
      id: apptId,
      patient_id: `P-${Date.now().toString().slice(-4)}`,
      doctor_name: doctor.name,
      doctor_specialty: doctor.specialty,
      doctor_qualifications: doctor.qualifications,
      doctor_experience: doctor.experience,
      status: 'BOOKED',
      attendance_status: 'Not Attended',
      verification_status: 'Pending',
      whatsapp_booking_status: 'Sent',
      whatsapp_verification_status: 'Pending',
      created_at: new Date().toISOString()
    };

    const waBookingContent = `Hello ${newApptData.patient_name},
Your clinic appointment has been successfully booked.

Reported Problem: ${newApptData.patient_problem}
Assigned Specialist: ${doctor.name} (${doctor.specialty})
Qualifications: ${doctor.qualifications}
Experience: ${doctor.experience}

Date: ${newApptData.appointment_date}
Time: ${newApptData.appointment_time}
Appointment ID: ${apptId}

Please visit the clinic at your scheduled time.

Thank you,
Clinic Booking`;

    const bookingWAMessage: WhatsAppMessage = {
      id: `WA-${Date.now().toString().slice(-5)}`,
      patient_id: createdAppt.patient_id,
      patient_name: newApptData.patient_name,
      appointment_id: apptId,
      phone: newApptData.phone,
      message_type: 'APPOINTMENT_CONFIRMATION',
      message: waBookingContent,
      status: 'Sent',
      sent_at: fullStr
    };

    const createLog: AutomationLog = {
      id: `LOG-${Date.now()}-1`,
      appointment_id: apptId,
      patient_name: newApptData.patient_name,
      event_type: 'APPOINTMENT_CREATED',
      description: `New booking ${apptId} for ${newApptData.patient_name}. Problem: "${newApptData.patient_problem}". Auto-assigned specialist ${doctor.name} (${doctor.specialty}).`,
      timestamp: fullStr
    };

    const waLog: AutomationLog = {
      id: `LOG-${Date.now()}-2`,
      appointment_id: apptId,
      patient_name: newApptData.patient_name,
      event_type: 'WHATSAPP_BOOKING_SENT',
      description: `WhatsApp appointment message sent to ${newApptData.patient_name}`,
      timestamp: fullStr
    };

    setAppointments(prev => [createdAppt, ...prev]);
    setMessages(prev => [bookingWAMessage, ...prev]);
    setLogs(prev => [waLog, createLog, ...prev]);
    setLatestWhatsAppNotification(bookingWAMessage);

    return createdAppt;
  };

  const updateAppointment = (id: string, updatedFields: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updatedFields } : a));
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_APPOINTMENTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_LOGS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_MESSAGES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CONFIG);
    setAppointments(INITIAL_APPOINTMENTS);
    setLogs(INITIAL_LOGS);
    setMessages(INITIAL_MESSAGES);
    setWhatsappConfig(DEFAULT_WHATSAPP_CONFIG);
  };

  const runTestWorkflowSequence = async () => {
    if (isSimulatingWorkflow) return;
    setIsSimulatingWorkflow(true);

    const testPatientName = `Test Patient (${Math.floor(Math.random() * 900 + 100)})`;
    const tempId = `CB-${Math.floor(Math.random() * 8000 + 2000)}`;

    for (let step = 1; step <= 6; step++) {
      setActiveWorkflowStep(step);
      await new Promise(r => setTimeout(r, 1200));
    }

    const { timeStr } = formatCurrentTimestamp();
    const demoAppt: Appointment = {
      id: tempId,
      patient_id: `P-${Date.now().toString().slice(-4)}`,
      patient_name: testPatientName,
      patient_problem: 'Tooth cavity and acute gum pain',
      phone: '9876500000',
      doctor_name: 'Dr. Sneha Reddy',
      doctor_specialty: 'Dental Specialist & Oral Surgeon',
      doctor_qualifications: 'B.D.S, M.D.S',
      doctor_experience: '12+ Years Experience',
      appointment_date: '21 Sep 2026',
      appointment_time: '6:00 PM',
      status: 'VERIFIED',
      attendance_status: 'Attended',
      check_in_time: timeStr,
      check_in_date: '21 Sep 2026',
      verification_status: 'Verified',
      whatsapp_booking_status: 'Sent',
      whatsapp_verification_status: 'Sent',
      created_at: new Date().toISOString()
    };

    setAppointments(prev => [demoAppt, ...prev]);
    setIsSimulatingWorkflow(false);
    setActiveWorkflowStep(null);
  };

  return {
    appointments,
    logs,
    messages,
    stats,
    whatsappConfig,
    activeWorkflowStep,
    isSimulatingWorkflow,
    latestWhatsAppNotification,
    setLatestWhatsAppNotification,
    setWhatsappConfig,
    markAsAttended,
    addAppointment,
    updateAppointment,
    resetDemoData,
    runTestWorkflowSequence,
    setActiveWorkflowStep
  };
}
