import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../_models/table';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  baseUrl = environment.gatewayUrl;
  constructor(private http: HttpClient) {}

  getActiveTables(roomId: number): Observable<Table[]> {
    return this.http.get<Table[]>(this.baseUrl + 'tables/room/' + roomId + '/active');
  }
  getTables(roomId: number): Observable<Table[]> {
    return this.http.get<Table[]>(this.baseUrl + 'tables/room/' + roomId);
  }
  updateTablesInRoom(tablesToAdd: Table[], tablesToDeleteIds: number[], tablesToUpdate: Table[]): Observable<Table[]> {
    return this.http.post<Table[]>(this.baseUrl + 'tables', { tablesToAdd, tablesToDeleteIds, tablesToUpdate });
  }
}
