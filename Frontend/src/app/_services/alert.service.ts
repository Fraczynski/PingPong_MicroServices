import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../_models/alert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl + 'alerts');
  }
  addAlert(alertToAdd: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.baseUrl + 'alerts', alertToAdd);
  }
  removeAlert(id: number) {
    return this.http.delete(this.baseUrl + 'alerts/' + id);
  }
}
