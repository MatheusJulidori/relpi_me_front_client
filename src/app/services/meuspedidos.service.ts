import { JsonFormatter } from 'tslint/lib/formatters';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MytasksService {
  url = environment.url;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getMyTasks(email_client) {
    const urlAvailable = this.url + 'mytask_client/';
    return this.http.post(urlAvailable, {email_client}).toPromise();
  }

    // tslint:disable-next-line:variable-name
  cancelar(id, email_client){
    const urlFinalizar = this.url + 'cancel/';
    return this.http.post(urlFinalizar, { id, email_client }).toPromise();
  }
}
