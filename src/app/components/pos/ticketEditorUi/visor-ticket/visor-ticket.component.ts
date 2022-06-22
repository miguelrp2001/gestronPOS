import { Component, Input, ViewChild, DoCheck, IterableDiffers, Output, EventEmitter, OnInit } from '@angular/core';
import { Ticket, Precio, Linea, Cliente } from '../../../../interfaces/interfaces';
import { AppService } from '../../../../services/app.service';
import { Observable, of, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-visor-ticket',
  templateUrl: './visor-ticket.component.html',
  styleUrls: ['./visor-ticket.component.css']
})
export class VisorTicketComponent implements DoCheck, OnInit {

  @Input() ticket: Ticket = {} as Ticket;
  precios: Precio[] = this.appservice.getPrecios();
  @Output() onBorrar = new EventEmitter<Linea>();

  @ViewChild('divitems') divitems: any;

  differ: any;

  constructor(private appservice: AppService, private differs: IterableDiffers) {
    this.differ = differs.find([]).create(undefined);

  }

  precio(precio: number) {
    return (this.precios.find(p => p.id == precio) || {} as Precio);
  }

  cliente(cliente_id: number): Cliente {
    return (this.appservice.getClientes().find(c => c.id == cliente_id) || {} as Cliente);
  }

  ngDoCheck(): void {
    const change = this.differ.diff(this.ticket.items);
    if (change != null) {
      this.scroll();
    }
  }

  total() {
    let total = 0;
    this.ticket.items.forEach(item => {
      if (item.estado == 'a') {
        total += item.precio;
      }
    });
    return total;
  }

  ngOnInit(): void {
  }

  borrar(item: Linea) {
    this.onBorrar.emit(item);
  }

  scroll() {
    if (this.divitems) {
      this.divitems.nativeElement.scroll({ top: this.divitems.nativeElement.scrollHeight + 10, behavior: 'smooth' });
    }
  }

}
