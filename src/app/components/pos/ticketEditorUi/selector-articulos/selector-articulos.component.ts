import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { Precio } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-selector-articulos',
  templateUrl: './selector-articulos.component.html',
  styleUrls: ['./selector-articulos.component.css']
})
export class SelectorArticulosComponent implements OnInit {

  @Output() articuloMarcado = new EventEmitter<Precio>();

  constructor(private appservice: AppService) { }

  ngOnInit(): void {
  }

  getArticulos(familia_id: number) {
    let precios = this.appservice.getPrecios();

    return precios.filter(precio => precio.articulo.familia_id == familia_id);
  }

  getFamilias() {
    return this.appservice.getFamilias();
  }

  addArticulo(precio: Precio) {
    this.articuloMarcado.emit(precio);
  }

}
