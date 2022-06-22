import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { Ticket, Precio, Impuesto, Linea, Perfil, Cliente, FormaPago } from '../../../interfaces/interfaces';
import { TicketService } from '../../../services/ticket.service';
import { PrintingService } from '../../../services/printing.service';

interface LineaCompacta {
  cantidad: number;
  precio_id: number;
  descripcion: string;
  precioud: number;
  baseImponible: number;
  impuesto: Impuesto;
}

@Component({
  selector: 'app-ticket-printed',
  templateUrl: './ticket-printed.component.html',
  styleUrls: ['./ticket-printed.component.css']
})
export class TicketPrintedComponent implements OnInit {

  ticket: Ticket;
  precios: Precio[] = this.appservice.getPrecios();
  impuestos: Impuesto[] = [];

  constructor(private appservice: AppService, private ticketservice: TicketService, route: ActivatedRoute, private printservice: PrintingService) {
    this.ticket = this.ticketservice.getTicket(route.snapshot.params['id']) || {} as Ticket;

    this.ticket.items.forEach(item => {
      if (this.impuestos.findIndex(i => i.id == this.precio(item.precio_id).impuesto.id) == -1) {
        this.impuestos.push(this.precio(item.precio_id).impuesto);
      }
    });
  }

  formacobro(id: number): FormaPago {
    return this.appservice.getFormasPago().filter(f => f.id == id)[0];
  }

  ngOnInit(): void {

    this.printservice.onDataReady();
  }

  precio(precio: number): Precio {
    return (this.precios.find(p => p.id == precio) || {} as Precio);
  }

  baseImponible(impuesto: Impuesto): number {
    return this.ticket.items.reduce((total, item) => total + ((item.estado == "a" && this.precio(item.precio_id).impuesto.id == impuesto.id) ? this.precio(item.precio_id).precio / (1 + impuesto.porcentaje / 100) : 0), 0);
  }

  total(impuesto: Impuesto): number {
    return this.ticket.items.reduce((total, item) => total + ((item.estado == "a" && this.precio(item.precio_id).impuesto.id == impuesto.id) ? this.precio(item.precio_id).precio : 0), 0);
  }

  totalCompleto(): number {
    return this.ticket.items.reduce((total, item) => total + ((item.estado == "a") ? this.precio(item.precio_id).precio : 0), 0);
  }

  itemsActivos(): LineaCompacta[] {
    let lineasCompactas: LineaCompacta[] = [];
    this.ticket.items.filter(item => item.estado == "a").forEach(item => {
      if (lineasCompactas.find(linea => linea.precio_id == item.precio_id)) {
        (lineasCompactas.find(linea => linea.precio_id == item.precio_id) || {} as LineaCompacta).cantidad++;
      } else {
        lineasCompactas.push({
          cantidad: 1,
          precio_id: item.precio_id,
          descripcion: this.precio(item.precio_id).articulo.nombre_corto,
          precioud: this.precio(item.precio_id).precio,
          baseImponible: this.precio(item.precio_id).precio / (1 + this.precio(item.precio_id).impuesto.porcentaje / 100),
          impuesto: this.precio(item.precio_id).impuesto
        });
      }
    });

    return lineasCompactas;
  }

  usuarioActivo(): Perfil {
    return this.appservice.getUser();
  }

  cliente(id: number): Cliente {
    return this.appservice.getClientes().filter(c => c.id == id)[0];
  }

}
