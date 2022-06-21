import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, Precio, Linea } from '../../../interfaces/interfaces';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-editor',
  templateUrl: './ticket-editor.component.html',
  styleUrls: ['./ticket-editor.component.css']
})
export class TicketEditorComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ticketService: TicketService) { }

  id: number = 0;

  ticket(): Ticket {
    return this.ticketService.getTicket(this.id) || {} as Ticket;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  borrar(item: Linea) {
    this.ticketService.borrarItem(item);
  }

  articuloMarcado(precio: Precio) {
    console.log("Clicked: " + precio.articulo.nombre + "\nPrecio: " + precio.precio + "€" + "\nImpuesto: " + precio.impuesto.nombre + "\nBase imponible: " + (precio.precio / (1 + precio.impuesto.porcentaje / 100)) + "€");
    this.ticketService.addItem(precio);
  }
}
