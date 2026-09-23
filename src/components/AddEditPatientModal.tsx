import React, { useState, useEffect } from 'react';
import type { Appointment } from '../types';
import { autoAssignDoctor } from '../services/doctorMatcher';
import { User, X, Sparkles, CheckCircle2, Stethoscope, Award, FileText, AlertTriangle } from 'lucide-react';

interface AddEditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: Appointment | null;
  appointments: Appointment[];
}

export const AddEditPatientModal: React.FC<AddEditPatientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  appointments
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [patientProblem, setPatientProblem] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('21 Sep 2026');
  const [appointmentTime, setAppointmentTime] = useState('6:00 PM');
  const [notes, setNotes] = useState('');

  // Quick Problem Preset Tags
  const problemPresets = [
    { label: 'Toothache / Cavity', text: 'Severe tooth pain and cavity sensitivity' },
    { label: 'Chest Discomfort / Heart', text: 'Chest tightness and high blood pressure concern' },
    { label: 'Skin Rash / Allergy', text: 'Red itching skin rash and allergic reaction' },
    { label: 'Fever / Flu', text: 'Viral fever, cough, cold and body pain' },
    { label: 'Menstrual / PCOS', text: 'Irregular periods and PCOS hormonal problem' },
    { label: 'Bone / Back Pain', text: 'Severe joint pain and lower back pain' },
    { label: 'Ear / Throat', text: 'Throat infection and earache' },
    { label: 'Brain / Migraine', text: 'Frequent migraine headache and dizziness' }
  ];

  useEffect(() => {
    if (initialData) {
      setPatientName(initialData.patient_name);
      setPhone(initialData.phone);
      setPatientProblem(initialData.patient_problem || '');
      setAppointmentDate(initialData.appointment_date);
      setAppointmentTime(initialData.appointment_time);
      setNotes(initialData.notes || '');
    } else {
      setPatientName('');
      setPhone('');
      setPatientProblem('');
      setAppointmentDate('21 Sep 2026');
      setAppointmentTime('6:00 PM');
      setNotes('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Real-time matched doctor specifications
  const { doctor, matchReason } = autoAssignDoctor(patientProblem);

  // Check if doctor is already booked at selected Date and Time
  const isSlotBooked = appointments.some(a => 
    a.doctor_name.toLowerCase() === doctor.name.toLowerCase() &&
    a.appointment_date.toLowerCase() === appointmentDate.toLowerCase() &&
    a.appointment_time.toLowerCase() === appointmentTime.toLowerCase() &&
    a.status !== 'CANCELLED' &&
    a.id !== (initialData?.id || '')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !patientProblem.trim()) return;
    if (isSlotBooked) return;

    onSave({
      patient_name: patientName,
      phone,
      patient_problem: patientProblem,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F111A] border border-orange-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative glow-orange max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                PROBLEM-FIRST CLINIC BOOKING
              </span>
              <h3 className="text-lg font-bold text-white">
                {initialData ? `Edit Appointment (${initialData.id})` : 'New Patient Registration'}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Kumar"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {/* STEP 1: PATIENT DESCRIBES PROBLEM / SYMPTOMS */}
          <div className="bg-[#161925] p-4 rounded-xl border border-orange-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-orange-400 font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-400" />
                <span>STEP 1: Patient Medical Problem / Symptoms *</span>
              </label>
              <span className="text-[10px] text-slate-400">Describe condition</span>
            </div>

            <textarea
              required
              rows={2}
              placeholder="Describe symptoms e.g. Toothache, periods problem, back pain, migraine..."
              value={patientProblem}
              onChange={(e) => setPatientProblem(e.target.value)}
              className="w-full bg-[#090A12] border border-white/15 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-medium"
            />

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold self-center">Quick Select:</span>
              {problemPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPatientProblem(preset.text)}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/5 hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/40 transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: AUTOMATICALLY MATCHED & ASSIGNED SPECIALIST DOCTOR */}
          <div className="bg-gradient-to-r from-[#162032] to-[#0F1522] p-4 rounded-xl border border-emerald-500/40 space-y-3 shadow-lg glow-green">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                    STEP 2: AUTO-ASSIGNED SPECIALIST
                  </span>
                  <span className="text-[10px] text-slate-300 font-medium">Doctor automatically matched based on patient problem</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>SYSTEM MATCHED</span>
              </span>
            </div>

            {/* Assigned Doctor Specification Details Card */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <span>{doctor.name}</span>
                  </h4>
                  <p className="text-xs font-bold text-emerald-400">{doctor.specialty}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] font-bold">
                  {doctor.department}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-slate-300">
                <div className="bg-[#090A12]/80 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block flex items-center gap-1">
                    <Award className="w-3 h-3 text-orange-400" />
                    Qualifications & Credentials
                  </span>
                  <p className="font-bold text-white">{doctor.qualifications}</p>
                </div>

                <div className="bg-[#090A12]/80 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Clinical Experience
                  </span>
                  <p className="font-bold text-emerald-300">{doctor.experience}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic bg-white/5 p-2 rounded border border-white/5">
                "{doctor.description}"
              </p>

              <div className="text-[10px] font-medium text-emerald-400/90 flex items-center gap-1 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{matchReason}</span>
              </div>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Appointment Date</label>
              <input
                type="text"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Time Slot</label>
              <select
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
              </select>
            </div>
          </div>

          {/* Slot Collision Alert */}
          {isSlotBooked && (
            <div className="bg-red-500/20 border-2 border-red-500 text-red-300 p-3.5 rounded-xl flex items-center gap-3 font-extrabold text-xs shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
              <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-red-400 uppercase tracking-widest text-[10px]">SLOT COLLISION DETECTED</span>
                <span className="text-white text-xs font-black tracking-wide">
                  ALREADY BOOKED PLEASE CHOOSE ANOTHER SLOT
                </span>
                <span className="text-[10px] text-red-200/90 font-normal">
                  {doctor.name} already has a confirmed booking on {appointmentDate} at {appointmentTime}.
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSlotBooked}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                isSlotBooked
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                  : 'text-black bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{isSlotBooked ? 'Slot Unavailable' : 'Confirm & Dispatch WhatsApp'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
