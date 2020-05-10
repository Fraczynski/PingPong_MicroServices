import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { RoomsService } from 'src/app/_services/rooms.service';
import { Room } from 'src/app/_models/room';
import { AuthService } from 'src/app/_services/auth.service';
import { TablesService } from 'src/app/_services/tables.service';
import { DrawRoomService } from 'src/app/_services/draw-room.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as cloneDeep from 'lodash/cloneDeep';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.component.html',
  styleUrls: ['./rooms-manager.component.css'],
})
export class RoomsManagerComponent implements OnInit {
  canvas: HTMLCanvasElement;

  rooms: Room[];
  currentRoom: Room;
  newRoom: Room;
  roomToEdit: Room;

  private tables: Table[];
  private newTables: Table[] = [];
  private deletedTablesIds: number[] = [];
  allTables: Table[];

  newRoomFormVisable = false;
  editRoomFormVisable = false;

  constructor(
    public reservationService: ReservationsService,
    public authService: AuthService,
    private toastr: ToastrService,
    private tablesService: TablesService,
    private roomsService: RoomsService,
    private drawRoomService: DrawRoomService
  ) {}

  ngOnInit() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // its workaround, without it canvas.offsetWidth equals 0 even in ngAfterViewInit
    setTimeout(() => this.getRooms(), 1);
  }

  getRooms() {
    this.canvas.width = this.canvas.offsetWidth;
    this.roomsService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
        if (!this.currentRoom) {
          this.currentRoom = this.rooms[0];
        }
        this.getTables();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteTable(table: Table) {
    if (this.newTables.includes(table)) {
      this.newTables = this.newTables.filter((t) => t !== table);
    } else {
      this.tables = this.tables.filter((t) => t !== table);
      this.deletedTablesIds.push(table.id);
    }
    this.allTables = this.allTables.filter((t) => t !== table);
    this.draw();
  }

  addNewTable() {
    const newTable: Table = {
      id: undefined,
      label: 'Nowy',
      tableLength: 2.74,
      tableWidth: 1.525,
      verticalOrientation: true,
      x: 0,
      y: 0,
      roomId: this.currentRoom.id,
    };
    this.newTables.push(newTable);
    this.allTables.push(newTable);
    this.draw();
  }
  openEditRoomForm() {
    this.roomToEdit = cloneDeep(this.currentRoom);
    this.editRoomFormVisable = true;
  }
  editRoom() {
    if (
      this.roomToEdit.name !== this.currentRoom.name ||
      this.roomToEdit.roomLength !== this.currentRoom.roomLength ||
      this.roomToEdit.roomWidth !== this.currentRoom.roomWidth
    ) {
      this.roomsService.editRoom(this.roomToEdit).subscribe(
        () => {
          this.toastr.success('Zaaktualizowano sale');
          this.editRoomFormVisable = false;
          this.currentRoom.name = this.roomToEdit.name;
          this.currentRoom.roomLength = this.roomToEdit.roomLength;
          this.currentRoom.roomWidth = this.roomToEdit.roomWidth;
          this.draw();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
  deleteRoom() {
    this.roomsService.deleteRoom(this.currentRoom).subscribe(
      () => {
        this.toastr.success('Usunięto sale');
        this.editRoomFormVisable = false;
        this.rooms = this.rooms.filter((r) => r !== this.currentRoom);
        this.changeCurrentRoom(this.rooms[0]);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  showAddRoomForm() {
    this.newRoom = { id: 0, roomLength: 0, roomWidth: 0, name: 'Sala' };
    this.newRoomFormVisable = true;
  }

  addRoom() {
    this.roomsService.addRoom(this.newRoom).subscribe(
      (data) => {
        this.toastr.success('Dodano pokój');
        this.newRoomFormVisable = false;
        this.rooms.push(data);
      },
      (error) => this.toastr.error(error)
    );
  }

  getTables() {
    this.tablesService.getTables(this.currentRoom.id).subscribe(
      (result) => {
        this.tables = result;
        this.allTables = cloneDeep(this.tables);
        this.newTables = [];
        this.deletedTablesIds = [];
        this.draw();
      },
      (error) => this.toastr.error(error)
    );
  }

  changeCurrentRoom(room: Room) {
    this.editRoomFormVisable = false;
    this.newRoomFormVisable = false;
    this.currentRoom = room;
    this.getTables();
  }

  draw() {
    this.drawRoomService.draw(this.canvas, this.currentRoom, this.allTables);
  }

  findChangedTables(): Table[] {
    const changedTables: Table[] = [];
    for (const table of this.allTables) {
      const orginal = this.tables.find((t) => t.id === table.id);
      if (orginal !== undefined) {
        if (
          orginal.label !== table.label ||
          orginal.verticalOrientation !== table.verticalOrientation ||
          orginal.x !== table.x ||
          orginal.y !== table.y
        ) {
          changedTables.push(table);
        }
      }
    }
    return changedTables;
  }

  saveTablesChanges() {
    const changedTables = this.findChangedTables();
    if (changedTables.length > 0 || this.newTables.length > 0 || this.deletedTablesIds.length > 0) {
      this.tablesService.updateTablesInRoom(this.newTables, this.deletedTablesIds, changedTables).subscribe(
        () => {
          this.toastr.success('Zmiany zapisane');
          this.getTables();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
}
