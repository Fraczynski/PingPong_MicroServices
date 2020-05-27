import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../_models/table';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  gatewayUrl = environment.gatewayUrl;
  constructor(private http: HttpClient) { }

  getActiveTables(roomId: number): Observable<Table[]> {
    return this.http.get<Table[]>(this.gatewayUrl + 'tables/room/' + roomId + '/active');
  }
  getTables(roomId: number): Observable<Table[]> {
    return this.http.get<Table[]>(this.gatewayUrl + 'tables/room/' + roomId);
  }
  updateTablesInRoom(tablesToAdd: Table[], tablesToDeleteIds: number[], tablesToUpdate: Table[]): Observable<Table[]> {
    return this.http.post<Table[]>(this.gatewayUrl + 'tables', { tablesToAdd, tablesToDeleteIds, tablesToUpdate });
  }

  getTablesInfo(idNumbers) {
    let params = new HttpParams();

    idNumbers.forEach(id => {
      params = params.append('id', id);
    });

    return this.http.get(this.gatewayUrl + 'tables/info', { params });
  }
}
