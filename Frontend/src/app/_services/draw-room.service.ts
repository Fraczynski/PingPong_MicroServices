import { Injectable } from '@angular/core';
import { Room } from '../_models/room';
import { Table } from '../_models/table';

@Injectable({
  providedIn: 'root',
})
export class DrawRoomService {
  backgroundColor = '#cccccc';
  activeTableColor = '#008080';
  activeTableLinesColor = '#ffffff';
  unactveTableColor = '#C3C3C3';
  unavalibleTableLinesColor = '#747474';
  font = 'bold 0.4px Arial';
  fontColor = '#008080';
  netWidth = 0.1;
  tableBorderWidth = 0.05;
  insideTableLineWidth = 0.04;
  constructor() {}

  getScale(canvas: HTMLCanvasElement, currentRoom: Room) {
    return canvas.offsetWidth / currentRoom.roomWidth;
  }

  draw(canvas: HTMLCanvasElement, currentRoom: Room, tables: Table[]) {
    const ctx = canvas.getContext('2d');
    const scale = canvas.width / currentRoom.roomWidth;
    canvas.height = currentRoom.roomLength * scale;
    ctx.fillStyle = this.backgroundColor;
    ctx.scale(scale, scale);
    ctx.lineWidth = this.tableBorderWidth;
    ctx.fillRect(canvas.clientLeft, canvas.clientTop, currentRoom.roomWidth, currentRoom.roomLength);
    ctx.strokeRect(canvas.clientLeft, canvas.clientTop, currentRoom.roomWidth, currentRoom.roomLength);
    let actualTableLength: number;
    let actualTableWidth: number;
    let tableColor;
    let linesColor;
    for (const table of tables) {
      if (table.active) {
        tableColor = this.activeTableColor;
        linesColor = this.activeTableLinesColor;
      } else {
        tableColor = this.unactveTableColor;
        linesColor = this.unavalibleTableLinesColor;
      }
      ctx.fillStyle = tableColor;
      ctx.strokeStyle = linesColor;
      ctx.lineWidth = this.tableBorderWidth;
      ctx.font = this.font;
      if (table.verticalOrientation) {
        actualTableWidth = table.tableWidth;
        actualTableLength = table.tableLength;
      } else {
        actualTableWidth = table.tableLength;
        actualTableLength = table.tableWidth;
      }
      ctx.fillRect(table.x, table.y, actualTableWidth, actualTableLength);
      ctx.strokeRect(table.x, table.y, actualTableWidth, actualTableLength);
      if (table.verticalOrientation) {
        ctx.lineWidth = this.insideTableLineWidth;
      } else {
        ctx.lineWidth = this.netWidth;
      }
      ctx.beginPath();
      ctx.moveTo(table.x + actualTableWidth / 2, table.y);
      ctx.lineTo(table.x + actualTableWidth / 2, table.y + actualTableLength);
      ctx.stroke();
      if (table.verticalOrientation) {
        ctx.lineWidth = this.netWidth;
      } else {
        ctx.lineWidth = this.insideTableLineWidth;
      }
      ctx.beginPath();
      ctx.moveTo(table.x, table.y + actualTableLength / 2);
      ctx.lineTo(table.x + actualTableWidth, table.y + actualTableLength / 2);
      ctx.stroke();
      ctx.fillStyle = this.fontColor;
      ctx.lineWidth = this.tableBorderWidth;
      ctx.fillText(table.label, table.x, table.y - 0.2);
    }
    if (!currentRoom.active) {
      ctx.fillStyle = 'rgba(204, 204, 204, 0.8)';
      ctx.fillRect(canvas.clientLeft, canvas.clientTop, currentRoom.roomWidth, currentRoom.roomLength);
    }
  }
}
