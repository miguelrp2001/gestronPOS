import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Precio } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-boton-articulo',
  templateUrl: './boton-articulo.component.html',
  styleUrls: ['./boton-articulo.component.css']
})
export class BotonArticuloComponent implements OnInit {

  @Input() precio: Precio = {} as Precio;
  @Input() badgeNumber: number = 0;
  @Output() onClick = new EventEmitter<Precio>();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.onClick.emit(this.precio);
  }

}
