import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) { }

  getReport(reportParams) {
    let params = new HttpParams();
    if (reportParams) {
      if (reportParams.type !== null && reportParams.type !== '') {
        params = params.append('type', reportParams.type);
      }
      if (reportParams.userId !== null && reportParams.userId !== '' && reportParams.userId !== undefined) {
        params = params.append('userId', reportParams.userId);
      }
      if (reportParams.pingPongTableId !== null && reportParams.pingPongTableId !== '' && reportParams.pingPongTableId !== undefined) {
        params = params.append('pingPongTableId', reportParams.pingPongTableId);
      }
      if (reportParams.minDate !== null && reportParams.minDate !== '' && reportParams.minDate !== undefined) {
        params = params.append('minDate', reportParams.minDate.toDateString());
      }
      if (reportParams.maxDate !== null && reportParams.maxDate !== '' && reportParams.maxDate !== undefined) {
        params = params.append('maxDate', reportParams.maxDate.toDateString());
      }
      if (reportParams.reservationStatus !== null && reportParams.reservationStatus !== '' && reportParams.reservationStatus !== undefined) {
        params = params.append('reservationStatus', reportParams.reservationStatus);
      }
    }
    debugger;

    return this.http.get(this.baseUrl + 'reports', { params });
  }
}
