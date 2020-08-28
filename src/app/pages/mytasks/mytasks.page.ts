import { MeuspedidosService } from 'src/app/services/meuspedidos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiDjangoService } from 'src/app/services/api-django.service';
import Swal from 'sweetalert2';
import { NavController, NavParams, ToastController, IonInfiniteScroll } from '@ionic/angular';
import validate = WebAssembly.validate;
import {JsonFormatter} from 'tslint/lib/formatters';
import {split} from "ts-node";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {

  users: any[];
  page: number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    
    public navCtrl: NavController,
    private userProvider: MeuspedidosService
  ) { }

  ionViewDidEnter() {
    this.users = [];
    this.page = 1;
    this.infiniteScroll.disabled = false;
    this.getAllUsers(this.page);
  }

  getAllUsers(page: number) {
    this.userProvider.meusPedidos()
      .then((result: any) => {
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];
          this.users.push(user);
        }

        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          if (this.users.length == result.total) {
            this.infiniteScroll.disabled = true;
          }
        }
      })
      .catch((error: any) => {
        console.log("ERRO SKJS");
        console.log(error);
      });
  }

  getUsers() {
    setTimeout(() => {
      this.page += 1;
      this.getAllUsers(this.page);
    }, 500);
  }

  //openUser(id: number) {
  //  this.userProvider.get(id)
  //    .then((result: any) => {
  //      this.navCtrl.push('UserDetailPage', { user: result.data });
  //    })
  //    .catch((error: any) => {
  //      this.toast.create({ message: 'Erro ao recuperar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
  //    });
  //}

  ngOnInit() {
  }

}
