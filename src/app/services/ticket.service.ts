import { Injectable } from '@angular/core';
import { Ticket, GestronRequest } from '../interfaces/interfaces';
import { GestronService } from './gestron.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private apiservice: GestronService, private appservice: AppService) {

    setInterval(() => {
      if (this.appservice.isLoaded()) {
        this.updateTickets();
      }
    }, 10000);

  }

  private tickets: Ticket[] = [];
  private ticket: Ticket = {
    id: 0,
    items: [],
    estado: 'n',
    tipo: 'p',
  } as Ticket;

  public getTickets(): Ticket[] {
    return this.tickets;
  }

  public updateTickets() {
    this.apiservice.getTickets().subscribe((r: GestronRequest) => {
      if (r.data.tickets) {
        this.tickets = r.data.tickets;
      }
    });
  }

  public newTicket() {
    this.ticket = {
      id: 0,
      items: [],
      estado: 'n',
      tipo: 'p',
      trabajador: this.appservice.getUser(),
      trabajador_id: this.appservice.getUser().id
    } as Ticket;
  }
}
