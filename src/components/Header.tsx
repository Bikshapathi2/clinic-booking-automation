import React from 'react';
import { 
  Zap, 
  PlusCircle, 
  Database, 
  CheckCircle2, 
  MessageSquare, 
  Activity, 
  Settings, 
  LayoutDashboard,
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onOpenSettingsModal: () => void;
  onRunDemoFlow: () => void;
  isSimulating: boolean;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onOpenSettingsModal,
  onRunDemoFlow,
  isSimulating,
  onResetData
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database', label: 'Patient Database', icon: Database },
    { id: 'checkin', label: 'Patient Check-In', icon: CheckCircle2 },
    { id: 'whatsapp', label: 'WhatsApp Automation', icon: MessageSquare },
    { id: 'logs', label: 'Automation Logs', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090A12]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Top Header Brand Title matching Reference Image */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            {/* Step Number Badge [ 1 ] */}
            <div className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-600 text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-[0_0_12px_rgba(249,115,22,0.4)]">
              [ 1 ]
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Workflow Automation
              </span>
              <h1 className="text-xl lg:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  CLINIC BOOKING
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold tracking-normal">
                  🟢 SYSTEM LIVE
                </span>
              </h1>
            </div>
          </div>

          {/* Mobile Status Indicator */}
          <div className="sm:hidden flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={onRunDemoFlow}
            disabled={isSimulating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all ${
              isSimulating ? 'opacity-50 cursor-not-allowed animate-pulse' : 'hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
            title="Watch full 6-stage automation flow in action"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isSimulating ? 'Simulating...' : 'Test Demo Flow'}</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>

          <button
            onClick={onResetData}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset to default seed data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettingsModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Supabase & WhatsApp Credentials Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
