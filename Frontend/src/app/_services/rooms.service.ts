import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from '../_models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  baseUrl = environment.gatewayUrl;
  constructor(private http: HttpClient) {}
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl + 'rooms');
  }
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl + 'rooms', room);
  }
  editRoom(room: Room) {
    return this.http.put(this.baseUrl + 'rooms/' + room.id, room);
  }
  deleteRoom(room: Room) {
    return this.http.delete(this.baseUrl + 'rooms/' + room.id);
  }
}
