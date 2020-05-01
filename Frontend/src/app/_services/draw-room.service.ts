import { Injectable } from '@angular/core';
import { Room } from '../_models/room';

@Injectable({
  providedIn: 'root',
})
export class DrawRoomService {
  backgroundColor = '#cccccc';
  tableColor = '#008080';
  tableLinesColor = '#ffffff';
  font = 'bold 0.4px Arial';
  fontColor = '#008080';
  netWidth = 0.1;
  tableBorderWidth = 0.05;
  insideTableLineWidth = 0.04;

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
    ctx.fillRect(
      canvas.clientLeft,
      canvas.clientTop,
      currentRoom.roomWidth,
      currentRoom.roomLength
    );
    ctx.strokeRect(
      canvas.clientLeft,
      canvas.clientTop,
      currentRoom.roomWidth,
      currentRoom.roomLength
    );
    let tableVerticalSize: number;
    let tableHorizontalSize: number;
    for (const table of tables) {
      ctx.fillStyle = this.tableColor;
      ctx.strokeStyle = this.tableLinesColor;
      ctx.lineWidth = this.tableBorderWidth;
      ctx.font = this.font;
      if (table.verticalOrientation) {
        tableHorizontalSize = table.tableWidth;
        tableVerticalSize = table.tableLength;
      } else {
        tableHorizontalSize = table.tableLength;
        tableVerticalSize = table.tableWidth;
      }
      ctx.fillRect(table.x, table.y, tableHorizontalSize, tableVerticalSize);
      ctx.strokeRect(table.x, table.y, tableHorizontalSize, tableVerticalSize);
      if (table.verticalOrientation) {
        ctx.lineWidth = this.insideTableLineWidth;
      } else {
        ctx.lineWidth = this.netWidth;
      }
      ctx.beginPath();
      ctx.moveTo(table.x + tableHorizontalSize / 2, table.y);
      ctx.lineTo(table.x + tableHorizontalSize / 2, table.y + tableVerticalSize);
      ctx.stroke();
      if (table.verticalOrientation) {
        ctx.lineWidth = this.netWidth;
      } else {
        ctx.lineWidth = this.insideTableLineWidth;
      }
      ctx.beginPath();
      ctx.moveTo(table.x, table.y + tableVerticalSize / 2);
      ctx.lineTo(table.x + tableHorizontalSize, table.y + tableVerticalSize / 2);
      ctx.stroke();
      ctx.fillStyle = this.fontColor;
      ctx.lineWidth = this.tableBorderWidth;
      ctx.fillText(table.label, table.x, table.y - 0.2);
    }
  }
}
