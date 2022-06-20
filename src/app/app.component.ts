import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { Centro, Perfil } from './interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestronPOS';

  constructor(private appservice: AppService, private router: Router) { }

  getCentroActivo(): Centro {
    return this.appservice.getCentro();
  }

  getUsuarioActivo(): Perfil {
    return this.appservice.getUser();
  }

  getRealTime(): Date {
    return this.appservice.getTime();
  }

  errorDeConexion(): boolean {
    return this.appservice.getErrorConexion();
  }

  synced(): boolean {
    return this.appservice.getSynced();
  }

  logoutUser() {
    this.appservice.logoutUser();
    this.router.navigate(['/pos']);
  }
}
