import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation, ReservationStatus } from '../_models/reservation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  baseUrl = environment.gatewayUrl;
  public reservationsCart: Reservation[] = [];
  constructor(private http: HttpClient) {}

  addToReservationsCart(res: Reservation) {
    this.reservationsCart.push(res);
  }

  removeFromReservationsCart(res: Reservation) {
    this.reservationsCart = this.reservationsCart.filter((re) => re !== res);
  }

  getAlreadyBookedReservations(date: Date, tableId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl + 'reservation/' + date.toDateString() + '/' + tableId);
  }
  sendReservations(userId: number, reservations: Reservation[]) {
    // hotfix, think about it later
    const reservationsToAdd: Reservation[] = [];
    for (const r of reservations) {
      reservationsToAdd.push({
        start: new Date(r.start.toUTCString()),
        end: new Date(r.end.toUTCString()),
        pingPongTableId: r.pingPongTableId,
        pingPongTableLabel: null,
        userId: null,
        free: null,
        id: null,
        reservationStatus: null,
      });
    }
    return this.http.post(this.baseUrl + 'reservation', { userId, reservationsToAdd });
  }
  changeReservationStatus(res: Reservation, reservationStatus: ReservationStatus) {
    return this.http.post(this.baseUrl + 'reservation/changeStatus/' + res.id, { reservationStatus });
  }
  getAllReservations(page?, itemsPerPage?, reservationParams?): Observable<PaginatedResult<Reservation[]>> {
    const paginatedResult: PaginatedResult<Reservation[]> = new PaginatedResult<Reservation[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (reservationParams) {
      if (reservationParams.userId !== null && reservationParams.userId !== '') {
        params = params.append('userId', reservationParams.userId);
      }
      if (reservationParams.reservationStatus !== null && reservationParams.reservationStatus !== '') {
        params = params.append('reservationStatus', reservationParams.reservationStatus);
      }
      if (reservationParams.pingPongTableId !== null && reservationParams.pingPongTableId !== '') {
        params = params.append('pingPongTableId', reservationParams.pingPongTableId);
      }
      if (reservationParams.start !== '') {
        const date: Date = new Date(reservationParams.start);
        date.setUTCDate(date.getUTCDate());
        params = params.append('start', date.toDateString());
      }
      if (reservationParams.orderBy !== '') {
        params = params.append('orderBy', reservationParams.orderBy);
      }
    }

    return this.http
      .get<Reservation[]>(this.baseUrl + 'reservation', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.results = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
}
