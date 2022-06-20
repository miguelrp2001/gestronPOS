import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-selector-articulos',
  templateUrl: './selector-articulos.component.html',
  styleUrls: ['./selector-articulos.component.css']
})
export class SelectorArticulosComponent implements OnInit {

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

}
