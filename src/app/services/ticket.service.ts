import { Injectable } from '@angular/core';
import { Ticket, GestronRequest, Cliente, Precio, Linea, Cobro } from '../interfaces/interfaces';
import { GestronService } from './gestron.service';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClientSelectorComponent } from '../components/pos/dialog/client-selector/client-selector.component';
import { CobrarTicketComponent } from '../components/pos/dialog/cobrar-ticket/cobrar-ticket.component';
import { PrintingService } from './printing.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private apiservice: GestronService, private appservice: AppService, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {

    setInterval(() => {
      if (this.appservice.isLoaded() && this.ticket.id == 0) {
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

  public currentTicket(): Ticket {
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
      update: true,
    } as Linea;
    this.ticket.items.push(lineaNueva);
  }

  public borrarItem(item: Linea) {
    if (item.id != 0) {
      item.estado = 'c';
      item.update = true;
    } else {
      this.ticket.items.splice(this.ticket.items.findIndex(p => p == item), 1);
    }

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


  public annulTicket() {

    if (this.ticket.items.length < 1 && this.ticket.id == 0) {
      let snackNoItemd = this.snackbar.open('No se puede anular un ticket vacío', 'Salir sin anular', { duration: 5000 });

      snackNoItemd.onAction().subscribe(() => {
        this.router.navigate(['/pos/tickets']);
      });

    } else {

      this.apiservice.annulTicket(this.ticket).subscribe((r: GestronRequest) => {
        this.updateTickets();
        this.router.navigate(['/pos/tickets']);
        this.newTicket();
      });
    }
  }

  public saveTicket() {
    if (this.ticket.id == 0) {
      if (this.ticket.items.length < 1) {
        let snackNoItemd = this.snackbar.open('No se puede guardar un ticket vacío', 'Salir sin guardar', { duration: 5000 });

        snackNoItemd.onAction().subscribe(() => {
          this.router.navigate(['/pos/tickets']);
        });
      } else {
        this.apiservice.saveTicket(this.ticket).subscribe((r: GestronRequest) => {
          this.updateTickets();
          this.newTicket();
          this.router.navigate(['/pos/tickets']);
        });
      }
    } else {
      this.apiservice.updateTicket(this.ticket, this.ticket.items.filter((i => i.update == true))).subscribe((r: GestronRequest) => {
        this.updateTickets();
        this.router.navigate(['/pos/tickets']);
      });
    }
  }

  public saveTicketPrint(): Observable<GestronRequest> {
    if (this.ticket.id == 0) {
      return this.apiservice.saveTicket(this.ticket)
    } else {
      return this.apiservice.updateTicket(this.ticket, this.ticket.items.filter((i => i.update == true)))
    }
  }

  public annadirCliente() {
    let dialogoCliente = this.dialog.open(ClientSelectorComponent, {
      data: {
        clientes: this.appservice.getClientes(),
      }
    });

    dialogoCliente.afterClosed().subscribe((r: Cliente) => {
      if (r) {
        this.ticket.cliente = r;
        this.ticket.cliente_id = r.id;
      }
    });
  }

  public cobrarTicket() {
    if (this.ticket.items.length < 1) {
      let snackNoItemd = this.snackbar.open('No se puede cobrar un ticket vacío', 'Salir sin cobrar', { duration: 5000 });

      snackNoItemd.onAction().subscribe(() => {
        this.router.navigate(['/pos/tickets']);
      });
    } else {
      let dialogoCobro = this.dialog.open(CobrarTicketComponent, {
        data: {
          ticket: this.ticket,
          formaspago: this.appservice.getFormasPago(),
          precios: this.appservice.getPrecios(),
        }
      });

      dialogoCobro.afterClosed().subscribe((a) => {
        this.router.navigate(['/pos/tickets']);
      });
    }
  }
}
