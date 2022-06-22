import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { GestronRequest, Perfil } from '../../../interfaces/interfaces';
import { GestronService } from '../../../services/gestron.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPasswordPromptComponent } from '../dialog/user-password-prompt/user-password-prompt.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {



  users(): Perfil[] {
    return this.appservice.getPerfiles();
  }

  constructor(private appservice: AppService, private apiservice: GestronService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  selectUser(user: Perfil) {
    if (this.appservice.getUser().id != user.id) {
      let paswwordDialog = this.dialog.open(UserPasswordPromptComponent, {
        data: user
      });

      paswwordDialog.afterClosed().subscribe((perfil: Perfil) => {
        if (perfil) {
          this.apiservice.authPerfil(perfil).subscribe((r: GestronRequest) => {
            if (r.status == "ok") {
              this.appservice.setUser(perfil);
              this.snackbar.open("Bienvenido " + perfil.nombre, "", { duration: 2000, verticalPosition: "bottom", horizontalPosition: "right" });
              this.router.navigate(["/pos/tickets"]);
            }
          }, (err) => {
            this.snackbar.open("Autenticación fallida", "", { duration: 2000 });
          })
        }
        delete user.clave;
      }
      );
    } else {
      this.router.navigate(["/pos/tickets"]);
    }
  }
}
