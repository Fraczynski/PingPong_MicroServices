import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpeningHours } from '../_models/openingHours';
import { SpecialOpeningHours } from '../_models/specialOpeningHours';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {

  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getAllOpeningHours(): Observable<OpeningHours[]> {
    return this.http.get<OpeningHours[]>(this.baseUrl + 'openinghours');
  }
  getAllSpecialOpeningHours(): Observable<SpecialOpeningHours[]> {
    return this.http.get<SpecialOpeningHours[]>(
      this.baseUrl + 'openingHours/special'
    );
  }
  getOpeningHours(weekDay: WeekDay): Observable<OpeningHours> {
    return this.http.get<OpeningHours>(
      this.baseUrl + 'openingHours/' + weekDay
    );
  }
  getSpecialOpeningHours(date: Date): Observable<SpecialOpeningHours> {
    return this.http.get<SpecialOpeningHours>(
      this.baseUrl + 'openingHours/special/' + date.toLocaleDateString()
    );
  }
  changeOpeningHours(openingHours: OpeningHours[]) {
    return this.http.post(this.baseUrl + 'openingHours', openingHours);
  }
  addSpecialOpeningHours(openingHours: SpecialOpeningHours): Observable<SpecialOpeningHours> {
    openingHours.day.setUTCDate(openingHours.day.getDate());
    openingHours.day.setUTCHours(openingHours.day.getHours());
    return this.http.post<SpecialOpeningHours>(this.baseUrl + 'openingHours/special', openingHours);
  }
  deleteSpecialOpeningHours(id: number) {
    return this.http.delete(this.baseUrl + 'openingHours/special/' + id);
  }

}
