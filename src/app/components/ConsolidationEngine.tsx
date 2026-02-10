import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, RefreshCw, BarChart3, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';

export function ConsolidationEngine() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, [progress, isRunning]);

  const handleRun = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    >
      <Card className="p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-500 relative overflow-hidden">
        {/* Subtle accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/5 to-amber-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg shadow-sm">
                  <BarChart3 className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Consolidation Engine
                </h2>
              </div>
              <p className="text-slate-600 font-medium">
                Run the agent to identify consolidation opportunities from pending orders
              </p>
            </div>

            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold shadow-sm hover:shadow-md transition-all duration-300 px-5 py-5"
                >
                  <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  Run Analysis
                </Button>
              </motion.div>
              <Button
                variant="outline"
                className="hover:bg-slate-50 border-slate-200 hover:border-slate-300 transition-colors duration-200 py-5"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          {isRunning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200/60 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Analyzing routes...</span>
                <span className="font-semibold text-slate-900">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-slate-100" />
            </motion.div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-white backdrop-blur-sm rounded-xl border border-slate-200/60 hover:border-emerald-200/60 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg shadow-sm">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Routes Optimized</p>
                  <p className="text-2xl font-semibold text-slate-900">127</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-white backdrop-blur-sm rounded-xl border border-slate-200/60 hover:border-blue-200/60 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-sm">
                  <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Orders Consolidated</p>
                  <p className="text-2xl font-semibold text-slate-900">342</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-white backdrop-blur-sm rounded-xl border border-slate-200/60 hover:border-purple-200/60 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-sm">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Efficiency Gain</p>
                  <p className="text-2xl font-semibold text-slate-900">23%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}