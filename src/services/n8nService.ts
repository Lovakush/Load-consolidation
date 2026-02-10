// src/services/n8nService.ts

import { Shipment, ShipmentStats } from '../types/shipment';

class N8nService {
  private baseUrl: string;

  constructor() {
    // Get the webhook URL from environment variables
    // Default to the webhook-test URL if not set
    this.baseUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/load-consolidation-webhook';
  }

  /**
   * Trigger the n8n workflow and get shipment data
   */
  async triggerConsolidation(): Promise<Shipment[]> {
    console.log('🚀 Triggering n8n workflow at:', this.baseUrl);
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET', // Changed to GET to match n8n webhook
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data: Shipment[] = await response.json();
      console.log('✅ Received data:', {
        shipmentCount: data.length,
        firstShipment: data[0],
      });

      return data;
    } catch (error) {
      console.error('❌ Error fetching consolidation data:', error);
      
      // Provide more helpful error message
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to n8n. Make sure:\n1. n8n is running\n2. Workflow is activated\n3. URL is correct in .env.local');
      }
      
      throw error;
    }
  }

  /**
   * Calculate statistics from shipment data
   */
  calculateStats(shipments: Shipment[]): ShipmentStats {
    console.log('📊 Calculating stats for', shipments.length, 'shipments');
    
    const stats: ShipmentStats = {
      total_shipments: shipments.length,
      consolidated_shipments: 0,
      single_shipments: 0,
      total_orders: 0,
      carriers: {},
      transport_modes: {},
      manual_review_count: 0,
    };

    shipments.forEach((shipment) => {
      // Count shipment types
      if (shipment.shipment_type === 'Consolidated Shipment') {
        stats.consolidated_shipments++;
      } else {
        stats.single_shipments++;
      }

      // Count total orders
      stats.total_orders += shipment.orders.length;

      // Count carriers
      if (stats.carriers[shipment.selected_carrier]) {
        stats.carriers[shipment.selected_carrier]++;
      } else {
        stats.carriers[shipment.selected_carrier] = 1;
      }

      // Count transport modes
      if (stats.transport_modes[shipment.transport_mode]) {
        stats.transport_modes[shipment.transport_mode]++;
      } else {
        stats.transport_modes[shipment.transport_mode] = 1;
      }

      // Count manual reviews
      if (shipment.selected_carrier === 'Manual Review') {
        stats.manual_review_count++;
      }
    });

    console.log('📈 Stats calculated:', stats);
    return stats;
  }

  /**
   * Test the n8n connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const n8nService = new N8nService();