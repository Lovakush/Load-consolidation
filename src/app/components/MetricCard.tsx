import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  index: number;
  gradient: string;
}

export function MetricCard({
  icon: Icon,
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  index,
  gradient,
}: MetricCardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-emerald-700'
      : changeType === 'negative'
      ? 'text-rose-700'
      : 'text-slate-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.25, ease: "easeOut" } 
      }}
    >
      <Card className="p-7 bg-white border border-slate-200/60 hover:border-yellow-400/50 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
        {/* Subtle background accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-[0.03] rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08]`} />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-5">
            <div className={`p-3.5 rounded-xl ${gradient} shadow-sm group-hover:shadow-md transition-all duration-300`}>
              <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            {change && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.2, ease: "easeOut" }}
                className={`px-3 py-1 rounded-md text-xs font-semibold ${changeColor} backdrop-blur-sm ${
                  changeType === 'positive'
                    ? 'bg-emerald-50 border border-emerald-100'
                    : changeType === 'negative'
                    ? 'bg-rose-50 border border-rose-100'
                    : 'bg-slate-50 border border-slate-100'
                }`}
              >
                {change}
              </motion.div>
            )}
          </div>
          <h3 className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider letter-spacing-wide">{title}</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.15 }}
            className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight"
          >
            {value}
          </motion.div>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}