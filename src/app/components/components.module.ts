import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from '../material/material/material.module';
import { TokenComponent } from './token/token.component';
import { PosDashComponent } from './pos-dash/pos-dash.component';
import { UserSelectorComponent } from './pos/user-selector/user-selector.component';
import { UserPasswordPromptComponent } from './pos/dialog/user-password-prompt/user-password-prompt.component';
import { TicketSelectorComponent } from './pos/ticket-selector/ticket-selector.component';
import { RouterModule } from '@angular/router';
import { TicketEditorComponent } from './pos/ticket-editor/ticket-editor.component';
import { VisorTicketComponent } from './pos/ticketEditorUi/visor-ticket/visor-ticket.component';
import { SelectorArticulosComponent } from './pos/ticketEditorUi/selector-articulos/selector-articulos.component';
import { BotonArticuloComponent } from './pos/ticketEditorUi/boton-articulo/boton-articulo.component';
import { ClientSelectorComponent } from './pos/dialog/client-selector/client-selector.component';
import { PriceChangerComponent } from './pos/dialog/price-changer/price-changer.component';
import { AltaClienteComponent } from './pos/dialog/alta-cliente/alta-cliente.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TicketPrintComponent } from './pos/ticket-print/ticket-print.component';
import { TicketPrintedComponent } from './pos/ticket-printed/ticket-printed.component';
import { CobrarTicketComponent } from './pos/dialog/cobrar-ticket/cobrar-ticket.component';



@NgModule({
  declarations: [
    LoadingComponent,
    TokenComponent,
    PosDashComponent,
    UserSelectorComponent,
    UserPasswordPromptComponent,
    TicketSelectorComponent,
    TicketEditorComponent,
    VisorTicketComponent,
    SelectorArticulosComponent,
    BotonArticuloComponent,
    ClientSelectorComponent,
    PriceChangerComponent,
    AltaClienteComponent,
    TicketPrintComponent,
    TicketPrintedComponent,
    CobrarTicketComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
