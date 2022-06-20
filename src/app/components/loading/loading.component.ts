import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { GestronService } from '../../services/gestron.service';
import { AppService } from '../../services/app.service';
import { GestronRequest, Centro } from '../../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { TokenComponent } from '../token/token.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private apiservice: GestronService, private appservice: AppService, private dialog: MatDialog, private router: Router) {
    this.load();
  }

  status: string = "";
  error: boolean = false;
  modoLoading: ProgressBarMode = "indeterminate";
  progress: number = 0;

  load() {
    this.appservice.setLoaded(false);
    this.error = false;
    this.status = "Cargando datos...";
    this.modoLoading = "determinate";
    if (this.appservice.isLogedIn()) {
      this.modoLoading = "determinate";
      this.progress = 3;
      this.status = "Cargando centro...";
      this.apiservice.getCentro().subscribe(
        (data: GestronRequest) => {
          this.appservice.setCentro(data.data.centro || {} as Centro);
          this.status = "Cargando familias...";
          this.progress = 22;
          this.apiservice.getFamilias().subscribe(
            (data: GestronRequest) => {
              this.appservice.setFamilias(data.data.familias || []);
              this.status = "Cargando articulos...";
              this.progress = 57;
              this.apiservice.getArticulos().subscribe(
                (data: GestronRequest) => {
                  this.appservice.setPrecios(data.data.precios || []);
                  this.status = "Cargando clientes...";
                  this.progress = 82;
                  this.apiservice.getClientes().subscribe(
                    (data: GestronRequest) => {
                      this.appservice.setClientes(data.data.clientes || []);
                      this.status = "Cargando perfiles...";
                      this.progress = 97;
                      this.apiservice.getPerfiles().subscribe(
                        (data: GestronRequest) => {
                          this.appservice.setPerfiles(data.data.perfiles || []);
                          this.status = "Preparando pantalla...";
                          this.progress = 100;
                          this.appservice.setLoaded(true);
                          if (this.appservice.getUser().id) {
                            this.router.navigate(['/pos/tickets']);
                          } else {
                            this.router.navigate(['/pos']);
                          }
                        }, (error: any) => {
                          this.error = true;
                          this.status = "Error al cargar perfiles";
                        })
                    }, (error) => {
                      this.error = true;
                      this.status = "Error al cargar clientes...";
                    });
                }, (error) => {
                  this.error = true;
                  this.status = "Error al cargar articulos...";
                });
            }, (error) => {
              this.error = true;
              this.status = "Error al cargar familias...";
            });
        }, (error) => {
          this.error = true;
          this.status = "Error al cargar centro...";
        });
    } else {
      this.status = 'Debe indicar un token para continuar';
      this.error = true;
      this.modoLoading = 'determinate';
      this.progress = 100
      let tokenDialog = this.dialog.open(TokenComponent, {});
      tokenDialog.afterClosed().subscribe(
        (data: string) => {
          if (data) {
            this.appservice.setToken(data);
          }
          this.load();
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
