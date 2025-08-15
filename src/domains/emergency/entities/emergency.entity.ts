
export interface EmergencyEntity {
  emergency_id: number;
  emergency_type: 'SEVERE' | 'MODERATE' | 'MINOR';
  calltime: Date;
  responder_id?: number;
  user_id: number;
  latitude: number;
  longitude: number;
  description?: string;
  status: 'pending' | 'in progress' | 'resolved';
  created_at: Date;
  updated_at?: Date;
}