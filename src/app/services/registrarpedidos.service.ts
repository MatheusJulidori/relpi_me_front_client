import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrarpedidosService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  registrarPedido(dataPedido){
    const urlPedido = this.url + 'postarPedido';
    return this.http.post(urlPedido, dataPedido);
  }
}
