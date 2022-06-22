import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { PosDashComponent } from './components/pos-dash/pos-dash.component';
import { LoadedGuard } from './interfaces/loaded.guard';
import { TicketSelectorComponent } from './components/pos/ticket-selector/ticket-selector.component';
import { UserSelectorComponent } from './components/pos/user-selector/user-selector.component';
import { TicketEditorComponent } from './components/pos/ticket-editor/ticket-editor.component';
import { PerfilAuthGuard } from './interfaces/perfil-auth.guard';
import { TicketPrintComponent } from './components/pos/ticket-print/ticket-print.component';
import { TicketPrintedComponent } from './components/pos/ticket-printed/ticket-printed.component';

const routes: Routes = [
  { path: "", redirectTo: "loading", pathMatch: "full" },
  { path: "loading", component: LoadingComponent },
  {
    path: "pos", component: PosDashComponent, canActivate: [LoadedGuard], children: [
      { path: "", component: UserSelectorComponent },
      { path: "tickets", component: TicketSelectorComponent },
      { path: "tickets/:id", component: TicketEditorComponent }
    ]
  },
  {
    path: "print", component: TicketPrintComponent, outlet: "print", children: [
      { path: "factura/:id", component: TicketPrintedComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
