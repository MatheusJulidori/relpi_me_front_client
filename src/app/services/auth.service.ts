import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;

  private PauthData: BehaviorSubject<any> | null = new BehaviorSubject(null);
  public readonly authData: Observable<any> = this.PauthData.asObservable();

  // public token;

  constructor(public http: HttpClient, /*private storage: Storage*/) { }

  login(loginData){
    const urlLogin = this.url + 'login';
    return this.http.post(urlLogin, loginData);
  }

  /*async saveAuth(authData) {
    await this.storage.set('authData', authData);
  }

  async getAuthData() {
    return await this.storage.get('authData');
  }

  async deleteAuthData() {
    await this.storage.remove('authData');
  }*/
}
