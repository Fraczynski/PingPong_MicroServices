import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return throwError('Błąd autoryzacji');
          } else if (error.status === 400) {
            const errorMessageType = error.headers.get('Content-Type');
            if (errorMessageType.includes('plain')) {
              return throwError(error.error);
            } else {
              if (errorMessageType.includes('problem')) {
                let modalStateErrors = '';
                if (error.error && typeof error.error.errors === 'object') {
                  for (const key in error.error.errors) {
                    if (error.error.errors[key]) {
                      modalStateErrors += error.error.errors[key] + '\n';
                    }
                  }
                }
                return throwError(modalStateErrors || error.error || 'Server Error');
              } else {
                let errorMessage = '';
                for (const singleError of error.error) {
                  errorMessage += singleError.description;
                }
                return throwError(errorMessage);
              }
            }
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
