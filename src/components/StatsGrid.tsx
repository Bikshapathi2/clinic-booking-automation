import React from 'react';
import type { DashboardStats } from '../types';
import { Calendar, UserCheck, Clock, ShieldCheck, MessageSquare, Activity } from 'lucide-react';

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statCards = [
    {
      label: "Today's Appointments",
      value: stats.todaysAppointments,
      icon: Calendar,
      color: 'from-orange-500/20 to-amber-500/10',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
      badge: '+12% vs yesterday',
      badgeColor: 'text-orange-400 bg-orange-500/10'
    },
    {
      label: 'Checked In',
      value: stats.checkedIn,
      icon: UserCheck,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badge: 'Arrivals tracked',
      badgeColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'from-amber-500/20 to-yellow-500/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      badge: 'Awaiting check-in',
      badgeColor: 'text-amber-400 bg-amber-500/10'
    },
    {
      label: 'Verified',
      value: stats.verified,
      icon: ShieldCheck,
      color: 'from-emerald-400/20 to-green-500/10',
      borderColor: 'border-emerald-400/40',
      iconColor: 'text-emerald-300',
      badge: 'Verified ✓',
      badgeColor: 'text-emerald-300 bg-emerald-500/20'
    },
    {
      label: 'WhatsApp Messages',
      value: stats.whatsappMessagesSent,
      icon: MessageSquare,
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      badge: 'Auto delivered',
      badgeColor: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      label: 'Automation Health',
      value: `${stats.automationSuccessRate}%`,
      icon: Activity,
      color: 'from-violet-500/20 to-purple-500/10',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-400',
      badge: '0 Errors',
      badgeColor: 'text-violet-400 bg-violet-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border bg-gradient-to-b ${card.color} ${card.borderColor} backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-300 tracking-wide line-clamp-1">
                {card.label}
              </span>
              <Icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {card.value}
              </span>
            </div>

            <div className="mt-2 flex items-center">
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
