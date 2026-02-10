// src/types/shipment.ts

export interface Shipment {
  shipment_id: string;
  shipment_type: 'Consolidated Shipment' | 'Single Order Shipment';
  transport_mode: 'FTL' | 'LTL' | 'Express';
  selected_carrier: string;
  selection_reason: string;
  goods_sensitivity: string;
  weight_class: string;
  pallet_class: string;
  delivery_urgency: string;
  consolidation_reason: string;
  orders: string[];
  ops_message?: string;
}

export interface ShipmentResponse {
  success: boolean;
  data: Shipment[];
  timestamp: string;
  total_shipments: number;
}

export interface ShipmentStats {
  total_shipments: number;
  consolidated_shipments: number;
  single_shipments: number;
  total_orders: number;
  carriers: Record<string, number>;
  transport_modes: Record<string, number>;
}