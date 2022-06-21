import { Injectable } from '@angular/core';
import { Ticket, GestronRequest, Cliente, Precio, Linea } from '../interfaces/interfaces';
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

  public getTicket(id: number | string): Ticket | undefined {
    if (id != "nuevo") {
      this.ticket = this.tickets.find(ticket => ticket.id == id) || this.ticket;
    }

    return this.ticket;
  }

  public addCliente(cliente: Cliente) {
    this.ticket.cliente = cliente;
  }

  public addItem(item: Precio) {
    let lineaNueva = {
      id: 0,
      estado: 'a',
      precio_id: item.id,
      precio: item.precio,
    } as Linea;
    this.ticket.items.push(lineaNueva);
    console.log(this.ticket);
  }

  public borrarItem(item: Linea) {
    if (item.id == 0) {
      (this.ticket.items.find(item => item == item) || {} as Linea).estado = 'c';
    }
    this.ticket.items.splice(this.ticket.items.findIndex(p => p == item), 1);
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
    console.log('NuevoTicket');
  }

  public saveTicket() {
    this.apiservice.saveTicket(this.ticket).subscribe((r: GestronRequest) => {
      console.log(r);
      this.updateTickets();

    });
  }
}
