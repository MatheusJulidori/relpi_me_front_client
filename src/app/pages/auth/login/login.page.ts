import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
      private router: Router,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      public navCtrl: NavController
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

    formataEnvio() {
      const registerDataReturn = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      };
    }

  login(){
    const loginData = this.formataEnvio();

    this.authService.login(loginData).subscribe(
        async (response: any) => {
          // await this.authService.saveAuth(loginData);
          await Swal.fire({
            title: 'Sucesso!',
            text: 'Logado com sucesso',
            icon: 'success'
          }).then(() => {
          this.navCtrl.navigateForward('/home');
        });
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao fazer login',
            icon: 'error'
          });

        }
    );
  }


}
