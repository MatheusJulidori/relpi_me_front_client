import { JsonFormatter } from 'tslint/lib/formatters';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeuspedidosService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  meusPedidos(){

    return new Promise((resolve, reject) => {

      const urlPedido = this.url + 'available/';
      
      this.http.get(urlPedido)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  get(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.url + 'available/' + id;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

}

//getAll(page: number) {
//  return new Promise((resolve, reject) => {
//
//    let url = this.API_URL + 'users/?per_page=10&page=' + page;
//
//    this.http.get(url)
//      .subscribe((result: any) => {
//        resolve(result.json());
//      },
//      (error) => {
//        reject(error.json());
//      });
//  });
//}