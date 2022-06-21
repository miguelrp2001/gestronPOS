import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestronRequest, Perfil, Ticket } from '../interfaces/interfaces';
import { APIURL } from './config.constants';

const BACKEND = APIURL + '/api/pos/';

@Injectable({
  providedIn: 'root'
})
export class GestronService {

  constructor(private http: HttpClient) { }

  getCentro(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'centro');
  }

  getArticulos(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'articulos');
  }

  getFamilias(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'familias');
  }

  getClientes(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'clientes');
  }

  getPerfiles(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'perfiles');
  }

  authPerfil(perfil: Perfil): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'perfil/auth', perfil);
  }

  getTickets(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tickets');
  }

  saveTicket(ticket: Ticket): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'ticket', ticket);
  }
}
