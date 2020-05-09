import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../_models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  baseUrl = environment.gatewayUrl;
  public reservationsCart: Reservation[] = [];
  constructor(private http: HttpClient) {}

  addToReservationsCart(res: Reservation) {
    this.reservationsCart.push(res);
  }

  removeFromReservationsCart(res: Reservation) {
    this.reservationsCart = this.reservationsCart.filter(re => re !== res);
  }

  getAlreadyBookedReservations(
    date: Date,
    tableId: number
  ): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      this.baseUrl + 'reservation/' + date.toDateString() + '/' + tableId
    );
  }
  sendReservations() {
    // hotfix, think about it later
    for (const r of this.reservationsCart) {
      r.start.setUTCHours(r.start.getHours());
      r.end.setUTCHours(r.end.getHours());
    }
    return this.http.post(this.baseUrl + 'reservation', this.reservationsCart);
  }
  getUserReservations(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl + 'reservation/' + userId);
  }
  cancelReservation(res: Reservation) {
    return this.http.delete(this.baseUrl + 'reservation/' + res.id);
  }

}
