import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {MytasksService} from '../../services/meuspedidos.service';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './task_details.page.html',
  styleUrls: ['./task_details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  task: any = {};
  authData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private mytasksService: MytasksService,
  ) {
    this.route.queryParams.subscribe( params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.task = this.router.getCurrentNavigation().extras.state.task;
      }
    });
  }

  ngOnInit() {
    this.authService.getAuthData().then((response) => {
      this.authData = response[0];
    }, error => {
      console.log(error);
    });
  }

  cancelar(taskID){
    this.mytasksService.cancelar(taskID, this.authData.email).then(
        (response) => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Tarefa finalizada com sucesso',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/home');
          });
        }, error => {
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao finalizar tarefa, tente novamente',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          console.log(error);
        }
    );
  }


}
