import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadedGuard implements CanActivate {
  constructor(private appservice: AppService, private router: Router, private snackbar: MatSnackBar) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appservice.isLoaded()) {
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/loading');
      return this.router.parseUrl('/loading');
    }
  }

}
