import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { ConsolidationEngine } from './components/ConsolidationEngine';
import { TimeFilter } from './components/TimeFilter';
import {
  Truck,
  DollarSign,
  Target,
  RotateCw,
  Clock,
  Leaf,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const metrics = [
    {
      icon: Truck,
      title: 'Truck Utilization',
      value: '87%',
      change: '+2.4%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
    },
    {
      icon: DollarSign,
      title: 'Logistics Cost / Shipment',
      value: '$1,240',
      change: '-5.1%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-yellow-500 to-amber-500',
    },
    {
      icon: Target,
      title: 'Cost per Ton/Mile',
      value: '$0.42',
      change: '-1.2%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-amber-400 to-amber-500',
    },
    {
      icon: RotateCw,
      title: 'Return Trip Utilization',
      value: '64%',
      change: '+8.9%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      value: '98.2%',
      change: '+0.5%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
    },
    {
      icon: Leaf,
      title: 'CO2 Intensity',
      value: '2.1 kg',
      change: '-3.4%',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Potential Savings',
      value: '$12.5k',
      change: 'Total pending',
      changeType: 'neutral' as const,
      gradient: 'bg-gradient-to-br from-yellow-400 to-amber-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-50">
      <Header />
      
      <main className="px-8 py-10 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
              Performance Metrics
            </h2>
            <p className="text-slate-600 font-medium">
              Track your logistics performance in real-time
            </p>
          </div>
          <TimeFilter />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              index={index}
            />
          ))}
        </div>

        <ConsolidationEngine />
      </main>
    </div>
  );
}