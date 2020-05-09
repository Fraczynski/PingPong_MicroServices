export interface Reservation {
  start: Date;
  end: Date;
  pingPongTableId: number;
  pingPongTableLabel: string;
  id: number;
  userId: number;
  free: boolean;
}
