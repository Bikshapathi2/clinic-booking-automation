import React, { useState, useMemo } from 'react';
import type { Appointment, BookingStatus } from '../types';
import { 
  Search, 
  User, 
  CheckCircle, 
  MessageSquare, 
  Edit3, 
  Check,
  Stethoscope,
  FileText
} from 'lucide-react';

interface PatientTableProps {
  appointments: Appointment[];
  onMarkAttended: (appointmentId: string) => void;
  onSelectWhatsAppMessage: (appointmentId: string) => void;
  onEditPatient: (appointment: Appointment) => void;
  onAddNew: () => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  appointments,
  onMarkAttended,
  onSelectWhatsAppMessage,
  onEditPatient,
  onAddNew
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const doctors = useMemo(() => {
    const list = Array.from(new Set(appointments.map(a => a.doctor_name)));
    return ['ALL', ...list];
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchesSearch = 
        appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.phone.includes(searchQuery) ||
        appt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (appt.patient_problem && appt.patient_problem.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDoctor = selectedDoctor === 'ALL' || appt.doctor_name === selectedDoctor;
      const matchesStatus = selectedStatus === 'ALL' || appt.status === selectedStatus;

      return matchesSearch && matchesDoctor && matchesStatus;
    });
  }, [appointments, searchQuery, selectedDoctor, selectedStatus]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'BOOKED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.2)] uppercase">
            BOOKED
          </span>
        );
      case 'PENDING':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
            PENDING
          </span>
        );
      case 'ATTENDED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
            ATTENDED
          </span>
        );
      case 'VERIFIED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-400/30 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(0,255,157,0.35)] uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            VERIFIED ✓
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 uppercase">
            CANCELLED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#0F111A] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
      
      {/* Table Header Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <User className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Appointment Database</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10 font-normal">
                  Problem & Auto-Doctor Assignment
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Patient reported symptoms, auto-assigned doctors, qualifications, and attendance status.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem, name, phone or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161925] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
            />
          </div>

          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="bg-[#161925] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-orange-500/60 transition-all cursor-pointer"
          >
            <option value="ALL">All Doctors</option>
            {doctors.filter(d => d !== 'ALL').map(doc => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#161925] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-orange-500/60 transition-all cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="BOOKED">BOOKED</option>
            <option value="ATTENDED">ATTENDED</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="PENDING">PENDING</option>
          </select>

          <button
            onClick={onAddNew}
            className="px-3 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 transition-all shadow-[0_0_12px_rgba(249,115,22,0.3)] whitespace-nowrap"
          >
            + New Problem Booking
          </button>
        </div>
      </div>

      {/* Main Database Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#090A12]/80 scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#161925]/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="p-3.5 pl-4">Appointment ID</th>
              <th className="p-3.5">Patient Name</th>
              <th className="p-3.5 min-w-[200px]">Reported Medical Problem</th>
              <th className="p-3.5 min-w-[220px]">Auto-Assigned Doctor & Specs</th>
              <th className="p-3.5">Date & Time</th>
              <th className="p-3.5">Booking Status</th>
              <th className="p-3.5">Attendance</th>
              <th className="p-3.5">Check-in Time</th>
              <th className="p-3.5">Verification</th>
              <th className="p-3.5">WhatsApp</th>
              <th className="p-3.5 text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-medium">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={11} className="p-8 text-center text-slate-500">
                  No patient records match the selected filters.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appt) => {
                const isVerified = appt.verification_status === 'Verified';
                const isAttended = appt.attendance_status === 'Attended';

                return (
                  <tr 
                    key={appt.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="p-3.5 pl-4 font-mono font-bold text-orange-400">
                      {appt.id}
                    </td>

                    <td className="p-3.5 text-white font-semibold">
                      <div>{appt.patient_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">+91 {appt.phone}</div>
                    </td>

                    {/* Patient Problem */}
                    <td className="p-3.5 text-amber-300">
                      <div className="flex items-start gap-1.5 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 text-amber-200">
                        <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{appt.patient_problem || 'General Health Concern'}</span>
                      </div>
                    </td>

                    {/* Auto-Assigned Doctor Specs */}
                    <td className="p-3.5">
                      <div className="bg-[#161925] p-2 rounded-lg border border-white/10 space-y-0.5">
                        <div className="text-white font-bold flex items-center gap-1">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{appt.doctor_name}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold line-clamp-1">
                          {appt.doctor_specialty || 'Specialist'}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">
                          {appt.doctor_qualifications || 'M.B.B.S'} • {appt.doctor_experience || 'Experienced'}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{appt.appointment_date}</span>
                        <span className="text-[10px] text-slate-400">{appt.appointment_time}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      {getStatusBadge(appt.status)}
                    </td>

                    <td className="p-3.5">
                      {isAttended ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Attended</span>
                        </span>
                      ) : (
                        <span className="text-slate-500">Not Attended</span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      {appt.check_in_time ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                          {appt.check_in_time}
                        </span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      {isVerified ? (
                        <span className="text-emerald-300 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>VERIFIED ✓</span>
                        </span>
                      ) : (
                        <span className="text-amber-400/80 text-[11px]">Pending</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => onSelectWhatsAppMessage(appt.id)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all text-[11px]"
                        title="Click to preview sent WhatsApp message"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        <span>✓ SENT</span>
                      </button>
                    </td>

                    <td className="p-3.5 text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isAttended ? (
                          <button
                            onClick={() => onMarkAttended(appt.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-900 bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_10px_rgba(0,255,157,0.3)] transition-all flex items-center gap-1"
                            title="Mark patient as attended and trigger verification"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark Attended</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400/60 font-semibold px-2 py-1 rounded bg-emerald-500/5">
                            Checked In
                          </span>
                        )}

                        <button
                          onClick={() => onEditPatient(appt)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Edit patient appointment details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Showing {filteredAppointments.length} of {appointments.length} appointment records</span>
        <span className="flex items-center gap-1 text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Auto-matched & Synchronized with Database
        </span>
      </div>

    </div>
  );
};
