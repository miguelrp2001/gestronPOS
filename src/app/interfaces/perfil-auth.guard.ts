import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilAuthGuard implements CanActivate {
  constructor(private appservice: AppService, private router: Router,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appservice.getUser().nombre) {
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/pos');
      return this.router.parseUrl('/pos');
    }
  }

}
