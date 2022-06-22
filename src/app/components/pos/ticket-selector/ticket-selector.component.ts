import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { Ticket, Linea } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-selector',
  templateUrl: './ticket-selector.component.html',
  styleUrls: ['./ticket-selector.component.css']
})
export class TicketSelectorComponent implements OnInit {

  tickets(): Ticket[] {
    return this.ticketservice.getTickets().filter(ticket => ticket.estado == "n");
  }

  total(items: Linea[]): number {
    return items.reduce((total, item) => total + ((item.estado == "a") ? item.precio : 0), 0);
  }

  constructor(private ticketservice: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.ticketservice.updateTickets();
  }

  openTicket(ticket: Ticket) {
    this.ticketservice.updateTickets();
    this.router.navigate(['/pos/tickets/', ticket.id]);
  }

}
