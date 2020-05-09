import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../_models/reservation';
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
  sendReservations() {
    // hotfix, think about it later
    for (const r of this.reservationsCart) {
      r.start.setUTCHours(r.start.getHours());
      r.end.setUTCHours(r.end.getHours());
    }
    return this.http.post(this.baseUrl + 'reservation', this.reservationsCart);
  }
  cancelReservation(res: Reservation) {
    return this.http.delete(this.baseUrl + 'reservation/' + res.id);
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
