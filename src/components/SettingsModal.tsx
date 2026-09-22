import React, { useState } from 'react';
import type { WhatsAppConfig } from '../types';
import { SUPABASE_SQL_SCHEMA } from '../services/supabaseClient';
import { Settings, Database, MessageSquare, Copy, Check, X, Terminal } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WhatsAppConfig;
  onSaveConfig: (config: WhatsAppConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'supabase'>('whatsapp');
  const [mode, setMode] = useState<'DEMO' | 'PRODUCTION'>(config.mode);
  const [phoneNumberId, setPhoneNumberId] = useState(config.phoneNumberId);
  const [accessToken, setAccessToken] = useState(config.accessToken);
  const [businessAccountId, setBusinessAccountId] = useState(config.businessAccountId);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      mode,
      phoneNumberId,
      accessToken,
      businessAccountId
    });
    onClose();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative glow-orange">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">System Settings & Integrations</h3>
              <p className="text-xs text-slate-400">Configure WhatsApp Cloud API and Supabase PostgreSQL Schema</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mb-6 bg-[#161925] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'whatsapp'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Cloud API</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'supabase'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Database Schema</span>
          </button>
        </div>

        {/* Tab 1: WhatsApp Configuration */}
        {activeTab === 'whatsapp' && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            
            <div className="bg-[#161925] p-4 rounded-xl border border-white/5 space-y-3">
              <label className="block text-slate-300 font-bold">API Mode Selection</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode('DEMO')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    mode === 'DEMO'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold">DEMO MODE</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Simulates WhatsApp delivery out of the box</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('PRODUCTION')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    mode === 'PRODUCTION'
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300 font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold">PRODUCTION CLOUD API</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Connects live Meta WhatsApp Cloud API</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">WhatsApp Phone Number ID</label>
              <input
                type="text"
                placeholder="e.g. 109876543210987"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Permanent Meta Access Token</label>
              <input
                type="password"
                placeholder="EAAG..."
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">WhatsApp Business Account ID</label>
              <input
                type="text"
                placeholder="e.g. 209876543210987"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
                className="w-full bg-[#161925] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all"
              >
                Save Settings
              </button>
            </div>

          </form>
        )}

        {/* Tab 2: Supabase Schema */}
        {activeTab === 'supabase' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Run this SQL in your Supabase SQL Editor to generate all 5 tables & RLS policies</span>
              </div>
              <button
                onClick={handleCopySql}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all font-bold flex items-center gap-1"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <div className="bg-[#090A12] border border-white/10 rounded-xl p-4 max-h-[300px] overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed">
              <pre>{SUPABASE_SQL_SCHEMA}</pre>
            </div>

            <div className="pt-4 flex justify-end border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
