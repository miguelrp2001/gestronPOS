import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from '../material/material/material.module';
import { TokenComponent } from './token/token.component';
import { FormsModule } from '@angular/forms';
import { PosDashComponent } from './pos-dash/pos-dash.component';
import { UserSelectorComponent } from './pos/user-selector/user-selector.component';
import { UserPasswordPromptComponent } from './pos/dialog/user-password-prompt/user-password-prompt.component';
import { TicketSelectorComponent } from './pos/ticket-selector/ticket-selector.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoadingComponent,
    TokenComponent,
    PosDashComponent,
    UserSelectorComponent,
    UserPasswordPromptComponent,
    TicketSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
