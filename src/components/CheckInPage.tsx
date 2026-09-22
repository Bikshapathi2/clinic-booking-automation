import React, { useState } from 'react';
import type { Appointment } from '../types';
import { 
  Search, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Phone, 
  User, 
  ShieldCheck, 
  MessageSquare,
  Check,
  Stethoscope,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckInPageProps {
  appointments: Appointment[];
  onMarkAttended: (appointmentId: string) => Appointment | null;
  onOpenWhatsAppPreview: (appointmentId: string) => void;
}

export const CheckInPage: React.FC<CheckInPageProps> = ({
  appointments,
  onMarkAttended,
  onOpenWhatsAppPreview
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApptId, setSelectedApptId] = useState<string>('CB-1024');

  const searchResults = appointments.filter(a => 
    a.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.phone.includes(searchQuery) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.patient_problem && a.patient_problem.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activePatient = appointments.find(a => a.id === selectedApptId) || appointments[0];

  const handleMarkAttendedClick = () => {
    if (!activePatient) return;
    
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FF9D', '#10B981', '#F97316']
      });
    } catch (e) {
      // ignore
    }

    onMarkAttended(activePatient.id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0F111A] border border-orange-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden glow-orange">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-extrabold shadow-lg">
              <UserCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                CLINIC RECEPTION DESK
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Mark Patient Attendance
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Automatic Timestamp & WhatsApp Dispatch Active</span>
          </div>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Search patient by Name, Medical Problem, Phone Number, or Appointment ID
        </label>
        
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type e.g. Toothache, Rahul, 9876543210, or CB-1024..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161925] border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
          />
        </div>

        {/* Rapid Search Suggestions Grid */}
        {searchQuery.trim() !== '' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-48 overflow-y-auto">
            {searchResults.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedApptId(p.id);
                  setSearchQuery('');
                }}
                className={`p-3 rounded-xl text-left border flex items-center justify-between transition-all ${
                  selectedApptId === p.id 
                    ? 'bg-orange-500/20 border-orange-500/50 text-white' 
                    : 'bg-[#161925] border-white/5 hover:border-white/20 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-white">{p.patient_name}</div>
                  <div className="text-[11px] font-mono text-orange-400">{p.id} • {p.phone}</div>
                  <div className="text-[10px] text-amber-300 line-clamp-1">{p.patient_problem}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {p.appointment_time}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Selected Patient Check-In Card */}
      {activePatient && (
        <div className={`bg-[#0F111A] border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all relative overflow-hidden ${
          activePatient.verification_status === 'Verified'
            ? 'border-emerald-500/50 glow-green'
            : 'border-orange-500/30 glow-orange'
        }`}>

          {/* Card Top Title Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                  {activePatient.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">Scheduled Appointment Record</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {activePatient.patient_name}
              </h3>
            </div>

            {/* Verification / Attendance Status Badge */}
            <div>
              {activePatient.verification_status === 'Verified' ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>ATTENDANCE VERIFIED ✓</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>CURRENT STATUS: {activePatient.status}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reported Problem & Auto-Assigned Specialist Box */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Patient Problem */}
            <div className="bg-[#161925] p-4 rounded-xl border border-amber-500/30 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                Reported Medical Problem / Symptoms
              </span>
              <p className="text-sm font-semibold text-amber-200 leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                "{activePatient.patient_problem || 'General Health Consultation'}"
              </p>
            </div>

            {/* Auto-Assigned Specialist Specifications */}
            <div className="bg-gradient-to-r from-[#162032] to-[#0F1522] p-4 rounded-xl border border-emerald-500/40 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                Auto-Assigned Specialist Doctor & Specifications
              </span>

              <div className="bg-[#090A12] p-3 rounded-lg border border-white/10 space-y-1">
                <div className="text-sm font-black text-white">{activePatient.doctor_name}</div>
                <div className="text-xs font-bold text-emerald-300">{activePatient.doctor_specialty || 'Specialist'}</div>
                <div className="text-[11px] text-slate-300 font-mono pt-1 border-t border-white/5 flex flex-wrap gap-2">
                  <span>🎓 {activePatient.doctor_qualifications || 'M.B.B.S'}</span>
                  <span>⭐ {activePatient.doctor_experience || '10+ Yrs Exp'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#161925] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                Phone Number
              </span>
              <p className="text-sm font-mono font-bold text-white">+91 {activePatient.phone}</p>
            </div>

            <div className="bg-[#161925] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-orange-400" />
                Patient Name
              </span>
              <p className="text-sm font-bold text-white">{activePatient.patient_name}</p>
            </div>

            <div className="bg-[#161925] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                Scheduled Date & Time
              </span>
              <p className="text-sm font-bold text-white">
                {activePatient.appointment_date} at {activePatient.appointment_time}
              </p>
            </div>
          </div>

          {/* Check-In Action Section */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {activePatient.attendance_status !== 'Attended' ? (
              <div className="w-full sm:w-auto flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-300 font-medium">
                    Clicking below will record exact check-in time and dispatch automatic WhatsApp verification.
                  </p>
                </div>
                
                <button
                  onClick={handleMarkAttendedClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black text-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 hover:from-emerald-300 hover:to-green-300 shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span>[ MARK AS ATTENDED ]</span>
                </button>
              </div>
            ) : (
              <div className="w-full bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-black font-extrabold shadow-[0_0_15px_#00ff9d]">
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      ATTENDANCE MARKED & VERIFIED
                    </span>
                    <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                      <span>Check-in Captured:</span>
                      <span className="font-mono text-emerald-300 font-extrabold bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/30">
                        {activePatient.check_in_date || activePatient.appointment_date} at {activePatient.check_in_time}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenWhatsAppPreview(activePatient.id)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>View WhatsApp Receipt Sent</span>
                </button>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
