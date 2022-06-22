import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { Centro, Perfil } from './interfaces/interfaces';
import { Router } from '@angular/router';
import { TicketService } from './services/ticket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestronPOS';

  constructor(private appservice: AppService, private router: Router, private ticketservice: TicketService) { }

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
    return (this.appservice.getErrorConexion()) ? true : false;
  }

  synced(): boolean {
    return (this.appservice.getSynced()) ? true : false;
  }

  logoutUser() {
    this.appservice.logoutUser();
    this.router.navigate(['/pos']);
  }

  enTicket(): boolean {
    return this.router.url.includes('/pos/tickets/');
  }

  nuevoTicket() {
    this.ticketservice.newTicket();
    this.router.navigate(['/pos/tickets/nuevo']);
  }

  uploadTicket() {
    this.ticketservice.saveTicket();
  }

  annadirCliente() {
    this.ticketservice.annadirCliente();
  }

  cobrarTicket() {
    this.ticketservice.cobrarTicket();
  }

  imprimirTicket() {
    this.ticketservice.imprimirTicket();
  }

  anularTicket() {
    this.ticketservice.annulTicket();
  }

  discardTicket() {
    this.router.navigate(['/pos/tickets']);
    this.ticketservice.newTicket();
  }

  isLoaded() {
    return this.appservice.isLoaded();
  }
}
