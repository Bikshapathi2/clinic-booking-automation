import { useState } from 'react';
import { useClinicStore } from './services/store';
import { Header } from './components/Header';
import { WorkflowVisualization } from './components/WorkflowVisualization';
import { StatsGrid } from './components/StatsGrid';
import { PatientTable } from './components/PatientTable';
import { CheckInPage } from './components/CheckInPage';
import { WhatsAppAutomationPage } from './components/WhatsAppAutomationPage';
import { AutomationLogsPage } from './components/AutomationLogsPage';
import { AddEditPatientModal } from './components/AddEditPatientModal';
import { WhatsAppSimulatorDrawer } from './components/WhatsAppSimulatorDrawer';
import { SettingsModal } from './components/SettingsModal';
import type { Appointment, WhatsAppMessage } from './types';
import { MessageSquare, X, ShieldCheck } from 'lucide-react';

export function App() {
  const {
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
    runTestWorkflowSequence
  } = useClinicStore();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Appointment | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedWhatsAppMsg, setSelectedWhatsAppMsg] = useState<WhatsAppMessage | null>(null);
  const [isWhatsAppSimulatorOpen, setIsWhatsAppSimulatorOpen] = useState(false);

  const handleOpenWhatsAppPreview = (appointmentId: string) => {
    const msg = messages.find(m => m.appointment_id === appointmentId) || messages[0] || null;
    setSelectedWhatsAppMsg(msg);
    setIsWhatsAppSimulatorOpen(true);
  };

  const handleEditPatient = (appt: Appointment) => {
    setEditingPatient(appt);
    setIsAddModalOpen(true);
  };

  const handleSavePatient = (data: any) => {
    if (editingPatient) {
      updateAppointment(editingPatient.id, data);
      setEditingPatient(null);
    } else {
      addAppointment(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A12] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      
      {/* Sticky Dashboard Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => {
          setEditingPatient(null);
          setIsAddModalOpen(true);
        }}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        onRunDemoFlow={runTestWorkflowSequence}
        isSimulating={isSimulatingWorkflow}
        onResetData={resetDemoData}
      />

      {/* Real-time WhatsApp Toast Notification */}
      {latestWhatsAppNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#1f2c34] border border-emerald-400 text-white p-4 rounded-2xl shadow-2xl max-w-sm flex items-start gap-3 glow-green">
            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">WhatsApp Delivered</span>
                <button 
                  onClick={() => setLatestWhatsAppNotification(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                {latestWhatsAppNotification.message.split('\n')[0]}
              </p>
              <button
                onClick={() => {
                  setSelectedWhatsAppMsg(latestWhatsAppNotification);
                  setIsWhatsAppSimulatorOpen(true);
                  setLatestWhatsAppNotification(null);
                }}
                className="mt-2 text-[10px] font-bold text-emerald-300 underline"
              >
                Click to open WhatsApp phone preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Center Animated Workflow Canvas */}
            <WorkflowVisualization
              activeStep={activeWorkflowStep}
              onRunDemoFlow={runTestWorkflowSequence}
              isSimulating={isSimulatingWorkflow}
            />

            {/* Statistics Cards */}
            <StatsGrid stats={stats} />

            {/* Patient Database Table View */}
            <PatientTable
              appointments={appointments}
              onMarkAttended={(id) => {
                markAsAttended(id);
              }}
              onSelectWhatsAppMessage={handleOpenWhatsAppPreview}
              onEditPatient={handleEditPatient}
              onAddNew={() => {
                setEditingPatient(null);
                setIsAddModalOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'database' && (
          <div className="animate-fadeIn">
            <PatientTable
              appointments={appointments}
              onMarkAttended={(id) => markAsAttended(id)}
              onSelectWhatsAppMessage={handleOpenWhatsAppPreview}
              onEditPatient={handleEditPatient}
              onAddNew={() => {
                setEditingPatient(null);
                setIsAddModalOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="animate-fadeIn">
            <CheckInPage
              appointments={appointments}
              onMarkAttended={(id) => markAsAttended(id)}
              onOpenWhatsAppPreview={handleOpenWhatsAppPreview}
            />
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div className="animate-fadeIn">
            <WhatsAppAutomationPage
              messages={messages}
              config={whatsappConfig}
              onUpdateConfig={setWhatsappConfig}
              onOpenSimulator={() => handleOpenWhatsAppPreview('CB-1024')}
            />
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="animate-fadeIn">
            <AutomationLogsPage logs={logs} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 text-center text-xs text-slate-500 bg-[#090A12]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 CLINIC BOOKING Automation Management System</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted • Supabase PostgreSQL • WhatsApp Business API</span>
          </span>
        </div>
      </footer>

      {/* Modals */}
      <AddEditPatientModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingPatient(null);
        }}
        onSave={handleSavePatient}
        initialData={editingPatient}
      />

      <WhatsAppSimulatorDrawer
        isOpen={isWhatsAppSimulatorOpen}
        onClose={() => setIsWhatsAppSimulatorOpen(false)}
        message={selectedWhatsAppMsg}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={whatsappConfig}
        onSaveConfig={setWhatsappConfig}
      />

    </div>
  );
}

export default App;
