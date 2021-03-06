import { Injectable } from '@angular/core';
import { EncryptStorage } from 'storage-encryption';
import { SECRET_KEY } from './config.constants';
import { Cliente, Familia, Articulo, Centro, Precio, Perfil, Ticket, GestronRequest, FormaPago } from '../interfaces/interfaces';
import { GestronService } from './gestron.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private apiservice: GestronService) {
    this.token = this.storageGet('token');
    if (this.token) {
      this.logedIn = true;
    }

    this.user = this.storageGet('user');
    if (!this.user) {
      this.user = {} as Perfil;
    }
    this.loaded = false;
    setInterval(() => {
      this.now = new Date();

    }, 1);

  }

  private now: Date = new Date();

  public getTime(): Date {
    return this.now;
  }

  private errorConexion: boolean = false;

  public getErrorConexion(): boolean {
    return this.errorConexion;
  }

  public setErrorConexion(error: boolean) {
    this.errorConexion = error;
  }

  private synced: boolean = true;

  public getSynced(): boolean {
    return this.synced;
  }

  public setSynced(synced: boolean) {
    this.synced = synced;
  }


  encStorage = new EncryptStorage(SECRET_KEY, 'localStorage');

  public storageSet(key: string, value: any) {
    this.encStorage.encrypt(key, value);
  }

  public storageGet(key: string): any {
    return this.encStorage.decrypt(key);
  }

  public storageClear(key: string) {
    this.encStorage.remove(key);
  }

  // Datos de centro

  private centro: Centro = {} as Centro;
  private precios: Precio[] = [];
  private familias: Familia[] = [];
  private clientes: Cliente[] = [];
  private prefiles: Perfil[] = [];
  private formasPago: FormaPago[] = [];
  public getPrecios(): Precio[] {
    return this.precios;
  }

  public getFamilias(): Familia[] {
    return this.familias;
  }

  public getClientes(): Cliente[] {
    return this.clientes;
  }

  public getCentro(): Centro {
    return this.centro;
  }

  public getPerfiles(): Perfil[] {
    return this.prefiles;
  }

  public getFormasPago(): FormaPago[] {
    return this.formasPago;
  }

  public setCentro(centro: Centro) {
    this.centro = centro;
  }

  public setClientes(clientes: Cliente[]) {
    this.clientes = clientes;
  }

  public setFamilias(familias: Familia[]) {
    this.familias = familias;
  }

  public setPrecios(precios: Precio[]) {
    this.precios = precios;
  }

  public setPerfiles(prefiles: Perfil[]) {
    this.prefiles = prefiles;
  }

  public setFormasPago(formasPago: FormaPago[]) {
    this.formasPago = formasPago;
  }

  private user: Perfil = {} as Perfil;

  public getUser(): Perfil {
    return this.user;
  }

  public setUser(user: Perfil) {
    this.user = user;
    this.storageSet('user', user);
  }

  public logoutUser() {
    this.user = {} as Perfil;
    this.storageClear('user');
  }

  public updateUsers() {
    this.apiservice.getPerfiles().subscribe(
      (data: GestronRequest) => {
        this.setPerfiles(data.data.perfiles || []);
      });
  }

  public updateClientes() {
    this.apiservice.getClientes().subscribe(
      (data: GestronRequest) => {
        this.setClientes(data.data.clientes || []);
      });
  }

  // Token de autenticaci??n

  private token: string = "";
  private logedIn: boolean = false;

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    this.storageSet('token', token);
    this.logedIn = true;
  }

  public isLogedIn(): boolean {
    return this.logedIn;
  }

  private loaded = false;

  public isLoaded(): boolean {
    return this.logedIn && this.loaded;
  }

  public setLoaded(loaded: boolean) {
    this.loaded = loaded;
  }

  public logout() {
    this.storageClear('token');
    this.token = "";
    this.logedIn = false;

  }


}
