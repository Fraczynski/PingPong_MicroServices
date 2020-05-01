import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  baseUrl = environment.gatewayUrl;
  constructor(private http: HttpClient) {}

  getTables(roomId: number): Observable<Table[]> {
    return this.http.get<Table[]>(this.baseUrl + 'tables/' + roomId);
  }
  updateTablesInRoom(tablesToAdd: Table[], tablesToDeleteIds: number[], tablesToUpdate: Table[]): Observable<Table[]> {
    return this.http.post<Table[]>(this.baseUrl + 'tables', {tablesToAdd, tablesToDeleteIds, tablesToUpdate});
  }
}
