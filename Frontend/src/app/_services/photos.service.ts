import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<Photo[]> {
    return this.http.get<any[]>(this.baseUrl + 'photos');
  }
  deletePhoto(id: number) {
    return this.http.delete(this.baseUrl + 'photos/' + id);
  }
}
