import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TablesService } from '../_services/tables.service';
import { Room } from '../_models/room';
import { RoomsService } from '../_services/rooms.service';
import { DrawRoomService } from '../_services/draw-room.service';

@Component({
  selector: 'app-tables',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.css'],
})
export class RoomsViewComponent implements OnInit {
  canvas: HTMLCanvasElement;

  rooms: Room[];
  public tables: Table[];

  currentRoom: Room;
  day = new Date();

  minDate: Date;
  maxDate: Date;

  constructor(
    private tablesService: TablesService,
    private roomsService: RoomsService,
    private localeService: BsLocaleService,
    private drawRoomService: DrawRoomService
  ) {}

  ngOnInit() {
    this.localeService.use('pl');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 14);
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = this.canvas.offsetWidth;
    this.getRooms();
  }

  getRooms() {
    this.roomsService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        this.currentRoom = this.rooms[0];
        this.getTables();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTables() {
    this.tablesService.getTables(this.currentRoom.id).subscribe(
      (result) => {
        this.tables = result;
        this.draw();
      },
      (error) => console.error(error)
    );
  }

  changeCurrentRoom(room: Room) {
    this.currentRoom = room;
    this.getTables();
  }
  draw() {
    this.drawRoomService.draw(this.canvas, this.currentRoom, this.tables);
  }
}
