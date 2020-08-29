import { MytasksService} from 'src/app/services/meuspedidos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiDjangoService } from 'src/app/services/api-django.service';
import Swal from 'sweetalert2';
import { NavController, NavParams, ToastController, IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {
  taskList: any = [];
  authData: any = {};

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
      private mytasksService: MytasksService,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuthData().then((response) => {
      this.authData = response[0];
      this.mytasksService.getMyTasks(this.authData.email).then(
          (response) => {
          this.taskList = response;
        }, error => {
          console.log(error);
      }
    );
    }, error => {
      console.log(error);
    });

  }

    goToTask(task) {
    const navigationExtras: NavigationExtras = {
      state: { task }
    };
    this.router.navigate(['task-details'], navigationExtras);
  }

    verifyEmpty() {
    return !(this.taskList && this.taskList.length > 0);

  }

}
