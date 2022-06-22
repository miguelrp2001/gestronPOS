import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestronRequest, Perfil, Ticket, Linea, Cliente } from '../interfaces/interfaces';
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

  updateTicket(ticket: Ticket, items: Linea[]): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'ticket/' + ticket.id, { cliente_id: ticket.cliente_id, items: items });
  }

  annulTicket(ticket: Ticket): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'ticket/' + ticket.id, {});
  }

  newCliente(cliente: Cliente): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'cliente', cliente);
  }

  getFormasPago(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'formaspago');
  }

  cobrarTicket(ticket: Ticket): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'ticket/' + ticket.id + '/cobrar', ticket);
  }
}
