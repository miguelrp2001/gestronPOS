import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Cliente, GestronRequest } from '../../../../interfaces/interfaces';
import { AltaClienteComponent } from '../alta-cliente/alta-cliente.component';
import { GestronService } from '../../../../services/gestron.service';
import { AppService } from '../../../../services/app.service';

interface ClienteData {
  clientes: Cliente[];
}

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.css']
})
export class ClientSelectorComponent implements OnInit {

  clientesn = this.data.clientes;

  constructor(public dialogRef: MatDialogRef<ClienteData>, @Inject(MAT_DIALOG_DATA) public data: ClienteData, private dialog: MatDialog, private apiservice: GestronService, private appservice: AppService) { }

  ngOnInit(): void {
  }


  altaCliente(cliente?: Cliente, errors?: string[]) {
    this.dialog.open(AltaClienteComponent, {
      data: {
        cliente: (cliente || { nombre: "", nombre_legal: "", nif: "", correo: "" }), errors: errors, create: true
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.apiservice.newCliente(result).subscribe((res: GestronRequest) => {
          if (res.data.cliente) {
            this.appservice.updateClientes();
            this.clientesn.push(res.data.cliente);
          }
        }, (err) => {
          this.altaCliente(result, err.error.errors);
        });
      }
    });
  }

}
