import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-clinic-booking.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-antigravity';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_SQL_SCHEMA = `-- Clinic Booking Database Schema SQL
-- Execute this in your Supabase SQL Editor to set up tables & RLS

-- 1. Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY, -- e.g. CB-1024
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'BOOKED', -- BOOKED, PENDING, ATTENDED, VERIFIED, CANCELLED
  attendance_status TEXT DEFAULT 'Not Attended',
  check_in_time TEXT,
  check_in_date TEXT,
  verification_status TEXT DEFAULT 'Pending',
  whatsapp_booking_status TEXT DEFAULT 'Pending',
  whatsapp_verification_status TEXT DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Attendance Log Table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id TEXT REFERENCES appointments(id) ON DELETE CASCADE,
  attendance_status TEXT NOT NULL,
  check_in_time TEXT NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WhatsApp Messages Table
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT,
  patient_name TEXT NOT NULL,
  appointment_id TEXT REFERENCES appointments(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  message_type TEXT NOT NULL, -- APPOINTMENT_CONFIRMATION, ATTENDANCE_VERIFICATION
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Sent',
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Automation Logs Table
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id TEXT,
  patient_name TEXT,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Allow read/write policies for authenticated staff
CREATE POLICY "Public read policy" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public insert policy" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update policy" ON appointments FOR UPDATE USING (true);
`;
