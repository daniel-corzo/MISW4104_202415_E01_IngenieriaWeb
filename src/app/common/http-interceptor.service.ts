import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private baseUrl = environment.apiUrl;

  constructor(private toastrService: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
    return next.handle(apiReq).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMesagge = '';
        let errorType = '';

        if (httpErrorResponse.error instanceof HttpErrorResponse) {
          errorType = "Client side error"
          errorMesagge = httpErrorResponse.statusText;
        }
        else {
          errorType = "Server side error"
          if (httpErrorResponse.status === 0) {
            errorMesagge = "No hay conexión con el servidor";
          }
          else {
            errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.statusText}`;
          }

          if (httpErrorResponse.statusText !== 'OK') {
            this.toastrService.error(errorMesagge, errorType, { closeButton: true })
          }
        }
        
        return throwError(() => new Error(errorMesagge));
      })
    );
  }
}

