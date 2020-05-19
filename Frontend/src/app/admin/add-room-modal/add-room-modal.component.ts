import { Component, OnInit } from '@angular/core';
import { Room} from 'src/app/_models/room';
import { RoomsService } from 'src/app/_services/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.css'],
})
export class AddRoomModalComponent implements OnInit {
  newRoom: Room;
  constructor(private roomsService: RoomsService, private toastr: ToastrService, private bsModalRef: BsModalRef) {}
  ngOnInit() {
    this.newRoom = { id: 0, roomLength: 0, roomWidth: 0, name: 'Sala', active: true };
  }
  addRoom() {
    this.roomsService.addRoom(this.newRoom).subscribe(
      (data) => {
        this.toastr.success('Dodano pokój');
        this.bsModalRef.hide();
      },
      (error) => this.toastr.error(error)
    );
  }
}
