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


  users: Perfil[] = [];

  constructor(private appservice: AppService, private apiservice: GestronService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
    this.users = this.appservice.getPerfiles();
  }

  ngOnInit(): void {
  }

  selectUser(user: Perfil) {
    let paswwordDialog = this.dialog.open(UserPasswordPromptComponent, {
      data: user
    });

    paswwordDialog.afterClosed().subscribe((perfil: Perfil) => {
      if (perfil) {
        this.apiservice.authPerfil(perfil).subscribe((r: GestronRequest) => {
          if (r.status == "ok") {
            this.appservice.setUser(perfil);
            delete perfil.clave;
            this.snackbar.open("Bienvenido " + perfil.nombre, "", { duration: 2000, verticalPosition: "top" });
            this.router.navigate(["/pos/tickets"]);
          }
        }, (err) => {
          delete perfil.clave;
          this.snackbar.open("Autenticación fallida", "", { duration: 2000 });
        })
      }
    }
    );
  }
}
