import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class PrintingService {

  constructor(private router: Router, private ticketservice: TicketService) { }
  printing = false;

  public imprimirTicket() {

    this.printing = true;

    this.router.navigate(['/', {
      outlets: {
        'print': ['print', 'factura', this.ticketservice.currentTicket().id]
      }
    }]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.printing = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }
}
