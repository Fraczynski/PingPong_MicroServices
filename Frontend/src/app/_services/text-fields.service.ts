import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TextFieldsService {
  baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}
  getTextFieldConent(textFieldName: string) {
    return this.http.get(this.baseUrl + 'text/' + textFieldName, {
      responseType: 'text',
    });
  }

  updateTextFieldConent(textFieldName: string, newContent: string) {
    return this.http.put(this.baseUrl + 'text/' + textFieldName, { newContent });
  }
}
