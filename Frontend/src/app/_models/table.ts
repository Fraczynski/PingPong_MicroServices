export interface Table {
  id: number;
  label: string;
  x: number;
  y: number;
  tableLength: number;
  tableWidth: number;
  verticalOrientation: boolean;
  roomId: number;
  active: boolean;
}
