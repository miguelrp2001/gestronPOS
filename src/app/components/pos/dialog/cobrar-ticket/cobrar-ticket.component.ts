import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Ticket, FormaPago, Precio, Cobro, GestronRequest } from '../../../../interfaces/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestronService } from '../../../../services/gestron.service';
import { AppService } from '../../../../services/app.service';
import { TicketService } from '../../../../services/ticket.service';
import { PrintingService } from '../../../../services/printing.service';

interface Datos {
  ticket: Ticket;
  precios: Precio[];
  formaspago: FormaPago[];
}

@Component({
  selector: 'app-cobrar-ticket',
  templateUrl: './cobrar-ticket.component.html',
  styleUrls: ['./cobrar-ticket.component.css']
})
export class CobrarTicketComponent implements OnInit {

  @ViewChild('precioinput') precioinput: any;

  cobros: Cobro[] = [];
  importe: number = this.totalRestante();
  constructor(private matdialogRef: MatDialogRef<Datos>, @Inject(MAT_DIALOG_DATA) public data: Datos, private snackbar: MatSnackBar, private ticketservice: TicketService, private apiservice: GestronService, private printservice: PrintingService) { }

  ngOnInit(): void {
  }

  totalCompleto(): number {
    return this.data.ticket.items.reduce((total, item) => total + ((item.estado == "a") ? item.precio : 0), 0);
  }

  totalCobrado(): number {
    return this.cobros.reduce((total, cobro) => total + cobro.cantidad, 0);
  }

  totalRestante(): number {
    return this.totalCompleto() - this.totalCobrado();
  }

  precio(precio: number): Precio {
    return (this.data.precios.find(p => p.id == precio) || {} as Precio);
  }

  addCobro(formaPago: FormaPago, importe: number) {
    if (importe > this.totalRestante()) {
      let snack = this.snackbar.open("Importe mayor que el total restante", "Ajustar", { duration: 3000 });
      snack.onAction().subscribe(() => {
        this.importe = this.totalRestante();
      });
    } else {
      this.cobros.push({
        id: 0,
        forma_pago_id: formaPago.id,
        cantidad: importe,
        ticket_id: this.data.ticket.id
      });
      this.importe = this.totalRestante();
      this.precioinput.nativeElement.select()
    }
  }

  borrarCobro(cobro: Cobro) {
    this.cobros.splice(this.cobros.indexOf(cobro), 1);
  }

  pillacobro(idforma: number): FormaPago {
    return this.data.formaspago.find(f => f.id == idforma) || {} as FormaPago;
  }

  todosCobros(): Cobro[] {
    return this.cobros;
  }

  finalizarCobro(cobros: Cobro[]) {
    this.ticketservice.saveTicketPrint().subscribe((res: GestronRequest) => {
      this.ticketservice.currentTicket().id = (res.data.ticket || {} as Ticket).id;
      this.ticketservice.currentTicket().cobros = cobros;
      this.apiservice.cobrarTicket(this.ticketservice.currentTicket()).subscribe((res: GestronRequest) => {
        this.printservice.imprimirTicket();
        this.matdialogRef.close(true);
      });
    });
  }

}
