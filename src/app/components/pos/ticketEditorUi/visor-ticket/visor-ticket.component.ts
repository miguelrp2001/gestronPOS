import { Component, Input, ViewChild, DoCheck, IterableDiffers, Output, EventEmitter } from '@angular/core';
import { Ticket, Precio, Linea } from '../../../../interfaces/interfaces';
import { AppService } from '../../../../services/app.service';
import { Observable, of, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-visor-ticket',
  templateUrl: './visor-ticket.component.html',
  styleUrls: ['./visor-ticket.component.css']
})
export class VisorTicketComponent implements DoCheck {

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

  ngDoCheck(): void {
    const change = this.differ.diff(this.ticket.items);
    if (change != null) {
      this.scroll();
      console.log(change);
    }
  }

  total() {
    let total = 0;
    this.ticket.items.forEach(item => {
      total += item.precio;
    });
    return total;
  }

  borrar(item: Linea) {
    console.log(item);
    this.onBorrar.emit(item);
  }

  scroll() {
    this.divitems.nativeElement.scroll({ top: this.divitems.nativeElement.scrollHeight + 10, behavior: 'smooth' });
  }

}
