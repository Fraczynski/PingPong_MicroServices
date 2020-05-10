import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  gatewayUrl = environment.gatewayUrl;
  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams) {
      if (userParams.firstName !== '') {
        params = params.append('firstName', userParams.firstName);
      }
      if (userParams.lastName !== '') {
        params = params.append('lastName', userParams.lastName);
      }
      if (userParams.email !== '') {
        params = params.append('email', userParams.email);
      }
      if (userParams.id !== null && userParams.id !== '') {
        params = params.append('id', userParams.id);
      }
      if (userParams.role !== '') {
        params = params.append('role', userParams.role);
      }
      if (userParams.orderBy !== '') {
        params = params.append('orderBy', userParams.orderBy);
      }
    }

    return this.http
      .get<User[]>(this.gatewayUrl + 'users', { observe: 'response', params })
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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.gatewayUrl + 'users/' + id);
  }
  deleteUser(id: number) {
    return this.http.delete(this.gatewayUrl + 'users/' + id);
  }
}
