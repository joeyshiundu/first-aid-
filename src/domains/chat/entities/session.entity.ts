export interface SessionEntity {
  session_id: number;
  user_id: number;
  start_time: Date;
  end_time?: Date | null;
  timestamp: Date;
}