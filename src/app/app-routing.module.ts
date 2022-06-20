import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { PosDashComponent } from './components/pos-dash/pos-dash.component';
import { LoadedGuard } from './interfaces/loaded.guard';
import { TicketSelectorComponent } from './components/pos/ticket-selector/ticket-selector.component';
import { UserSelectorComponent } from './components/pos/user-selector/user-selector.component';

const routes: Routes = [
  { path: "", redirectTo: "loading", pathMatch: "full" },
  { path: "loading", component: LoadingComponent },
  {
    path: "pos", component: PosDashComponent, canActivate: [LoadedGuard], children: [
      { path: "", component: UserSelectorComponent },
      { path: "tickets", component: TicketSelectorComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
