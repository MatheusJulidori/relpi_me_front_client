import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  authData: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.getAuthData().then((response) => {
      this.authData = response[0];
    }, error => {
      console.log(error);
    });
  }


  logout(){
    return this.authService.deleteAuthData();
  }
}
