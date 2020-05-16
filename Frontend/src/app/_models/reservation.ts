export interface Reservation {
  start: Date;
  end: Date;
  pingPongTableId: number;
  pingPongTableLabel: string;
  id: number;
  userId: number;
  free: boolean;
  reservationStatus: ReservationStatus;
}
export enum ReservationStatus {
  Cancelled,
  Convirmed,
  CustomerAbsence,
  Active,
}
