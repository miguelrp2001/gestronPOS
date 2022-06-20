import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, timeout } from 'rxjs';
import { APIIP } from './config.constants';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestronRequest } from '../interfaces/interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private appService: AppService, private router: Router, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.appService.getToken();
    if (request.url.includes(APIIP) && request.url.includes('api') && accessToken) {
      this.appService.setSynced(false);
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Token: accessToken
        }
      });
    }
    return next.handle(request).pipe(tap((r) => {
      if (r.type === 4) {
        this.appService.setSynced(true);
      }
    }, (requestError: HttpErrorResponse) => {
      this.appService.setSynced(true);
      if (request.url.includes('api') && !request.url.includes('auth') && requestError && requestError.status === 401) {
        let snackBarRef = this.snackBar.open('El token no es válido.', 'Volver a introducir', { duration: 1000000, verticalPosition: 'top' });
        snackBarRef.onAction().subscribe(() => {
          this.appService.logout();
          window.location.reload();
        }
        );
      } else if ((request.url.includes('api') && !request.url.includes('auth') && requestError && requestError.status === 403)) {
        let snackBarRef = this.snackBar.open('No está autorizado para realizar esta acción.', '', { duration: 5000, verticalPosition: 'top' });
        this.router.navigate(['/'])
      } else if ((request.url.includes('api') && !request.url.includes('auth') && requestError && requestError.status === 0)) {
        let snackBarRef = this.snackBar.open('No se pudo conectar con el servidor.', 'Recargar', { duration: 5000000, verticalPosition: 'top' });
        this.appService.setErrorConexion(true);
        snackBarRef.onAction().subscribe(() => {
          window.location.reload();
          this.appService.setErrorConexion(false);
        });
      }
      return next.handle(request);
    }));
  }
}
