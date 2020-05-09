import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClosingDay } from '../_models/closingDay';

@Injectable({
  providedIn: 'root'
})
export class ClosingDaysService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getAllClosingDays(): Observable<ClosingDay[]> {
    return this.http.get<ClosingDay[]>(this.baseUrl + 'closingDays');
  }
  addClosingDay(closingDay: ClosingDay): Observable<ClosingDay> {
    closingDay.day.setUTCDate(closingDay.day.getDate());
    closingDay.day.setUTCHours(closingDay.day.getHours());
    return this.http.post<ClosingDay>(this.baseUrl + 'closingDays', closingDay);
  }
  deleteClosingDay(id: number) {
    return this.http.delete(this.baseUrl + 'closingDays/' + id);
  }
}
