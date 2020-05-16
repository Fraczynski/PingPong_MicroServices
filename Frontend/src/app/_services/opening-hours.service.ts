import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpeningHours } from '../_models/openingHours';
import { SpecialOpeningHours } from '../_models/specialOpeningHours';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getAllOpeningHours(): Observable<OpeningHours[]> {
    return this.http.get<OpeningHours[]>(this.baseUrl + 'openinghours');
  }
  getAllSpecialOpeningHours(): Observable<SpecialOpeningHours[]> {
    return this.http.get<SpecialOpeningHours[]>(this.baseUrl + 'openingHours/special');
  }
  getOpeningHours(weekDay: WeekDay): Observable<OpeningHours> {
    return this.http.get<OpeningHours>(this.baseUrl + 'openingHours/' + weekDay);
  }
  getActualOpeningHours(date: Date): Observable<OpeningHours> {
    return this.http.get<OpeningHours>(this.baseUrl + 'openingHours/actual/' + date.toLocaleDateString());
  }
  getSpecialOpeningHours(date: Date): Observable<SpecialOpeningHours> {
    return this.http.get<SpecialOpeningHours>(this.baseUrl + 'openingHours/special/' + date.toLocaleDateString());
  }
  changeOpeningHours(openingHours: OpeningHours[]) {
    const openingHoursDto: any[] = [];
    for (const openingHour of openingHours) {
      openingHoursDto.push({
        start: openingHour.start.toUTCString().match('([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')[0],
        end: openingHour.end.toUTCString().match('([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')[0],
        open: openingHour.open,
        dayOfWeek: openingHour.dayOfWeek,
      });
    }
    return this.http.post(this.baseUrl + 'openingHours', openingHoursDto);
  }
  addSpecialOpeningHours(openingHours: SpecialOpeningHours): Observable<SpecialOpeningHours> {
    const openingHoursDto = {
      day: openingHours.day.toISOString(),
      description: openingHours.description,
      start: openingHours.start.toUTCString().match('([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')[0],
      end: openingHours.end.toUTCString().match('([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')[0],
    };
    return this.http.post<SpecialOpeningHours>(this.baseUrl + 'openingHours/special', openingHoursDto);
  }
  deleteSpecialOpeningHours(id: number) {
    return this.http.delete(this.baseUrl + 'openingHours/special/' + id);
  }
}
