// src/components/ConsolidationEngine.tsx

import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, RefreshCw, BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';
import { N8nService } from '../services/n8nService';
import type { Shipment, ShipmentStats } from '../types/shipment';

export function ConsolidationEngine() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [stats, setStats] = useState<ShipmentStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<string | null>(null);

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
    }
  }, [progress, isRunning]);

  const calculateStats = (shipmentData: Shipment[]): ShipmentStats => {
    const carriers: Record<string, number> = {};
    const transport_modes: Record<string, number> = {};
    let consolidated = 0;
    let single = 0;
    let total_orders = 0;

    shipmentData.forEach(shipment => {
      // Count carriers
      carriers[shipment.selected_carrier] = (carriers[shipment.selected_carrier] || 0) + 1;
      
      // Count transport modes
      transport_modes[shipment.transport_mode] = (transport_modes[shipment.transport_mode] || 0) + 1;
      
      // Count shipment types
      if (shipment.shipment_type === 'Consolidated Shipment') {
        consolidated++;
      } else {
        single++;
      }
      
      // Count total orders
      total_orders += shipment.orders.length;
    });

    return {
      total_shipments: shipmentData.length,
      consolidated_shipments: consolidated,
      single_shipments: single,
      total_orders,
      carriers,
      transport_modes,
    };
  };

  const handleRun = async () => {
    setProgress(0);
    setIsRunning(true);
    setError(null);

    try {
      // Call n8n workflow
      const response = await N8nService.triggerConsolidation();
      
      if (response.success && response.data) {
        setShipments(response.data);
        setStats(calculateStats(response.data));
        setLastRun(response.timestamp);
        setProgress(100);
      } else {
        throw new Error('Invalid response from consolidation workflow');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProgress(0);
      setIsRunning(false);
    }
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
                <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-sm">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Load Consolidation Engine
                </h3>
              </div>
              <p className="text-slate-600 font-medium ml-14">
                AI-powered shipment optimization and consolidation
              </p>
              
              {lastRun && (
                <p className="text-xs text-slate-500 ml-14 mt-2">
                  Last run: {new Date(lastRun).toLocaleString()}
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-slate-300 hover:border-slate-400"
                onClick={() => window.open('http://localhost:5678', '_blank')}
              >
                <TrendingUp className="w-4 h-4" />
                View Workflow
              </Button>
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className="gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-sm"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Consolidation
                  </>
                )}
              </Button>
            </div>
          </div>

          {isRunning && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Processing</span>
                <span className="text-sm font-medium text-slate-700">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-slate-500 mt-2">
                Analyzing loads, grouping shipments, and optimizing routes...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900">Error running consolidation</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {stats && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900">Consolidation Complete!</p>
                  <p className="text-sm text-green-700 mt-1">
                    Created {stats.total_shipments} shipments from {stats.total_orders} orders
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium mb-1">Total Shipments</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total_shipments}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium mb-1">Consolidated</p>
                  <p className="text-2xl font-bold text-green-900">{stats.consolidated_shipments}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium mb-1">Single Orders</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.single_shipments}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700 font-medium mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-amber-900">{stats.total_orders}</p>
                </div>
              </div>

              {/* Carriers Breakdown */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Carriers</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {Object.entries(stats.carriers).map(([carrier, count]) => (
                    <div key={carrier} className="text-sm">
                      <span className="text-slate-600">{carrier}:</span>{' '}
                      <span className="font-semibold text-slate-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transport Modes */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Transport Modes</h4>
                <div className="flex gap-4">
                  {Object.entries(stats.transport_modes).map(([mode, count]) => (
                    <div key={mode} className="text-sm">
                      <span className="text-slate-600">{mode}:</span>{' '}
                      <span className="font-semibold text-slate-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => console.log('Shipments:', shipments)}
                  className="gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Detailed Shipment Data
                </Button>
              </div>
            </div>
          )}

          {!stats && !isRunning && !error && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">
                Click "Run Consolidation" to optimize your shipments
              </p>
              <p className="text-sm text-slate-500 mt-2">
                The AI engine will analyze and group orders for cost efficiency
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}