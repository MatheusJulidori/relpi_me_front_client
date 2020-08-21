import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDjangoService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  register(registerData) {
    // relpimiback.herokuapp.com/api/register
    const urlRegister = this.url + 'register/';
    return this.http.post(urlRegister, registerData);
  }
}
