export interface Alert {
  id: number;
  message: string;
  alertType: AlertType;
}

export enum AlertType {
  Warning,
  Information,
}
