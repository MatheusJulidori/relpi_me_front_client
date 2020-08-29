import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import {RegistrarpedidosService} from '../../services/registrarpedidos.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  form: FormGroup;
  authData: any = {};

  constructor(
      private formBuilder: FormBuilder,
      private registraPedidoService: RegistrarpedidosService,
      public navCtrl: NavController,
      private authService: AuthService,
      ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      task_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required, Validators.min(0)]),
    });
      this.authService.getAuthData().then((response) => {
      this.authData = response[0];
    }, error => {
      console.log(error);
    });
  }

  getErrorMessage(form: FormGroup, field) {
    if (form.get(field)) {
      return form.get(field).hasError('required')
        ? 'Campo requerido'
        : form.get(field).hasError('min')
        ? 'Valor inválido'
        : '';
    }
  }
  
    isInvalid(field) {
      return (
        !this.form.controls[field].valid &&
        (this.form.controls[field].touched)
      );
    }

    formataEnvio() {
      const registerDataReturn = {
       
        email_client: this.authData.email,
        client_name: this.authData.full_name,
        client_phone: this.authData.phone,
        is_taken: false,
        email_helper: "a",
        helper_name: "a",
        helper_phone: "a",
        task_name: this.form.get('task_name').value,
        description: this.form.get('description').value,
        payment: this.form.get('payment').value,
        pago: false,
        cancelado: false,
        terminado: false
      };

      return registerDataReturn;
    }

    cadastrar() {
      const registerData = this.formataEnvio();
  
      this.registraPedidoService.registrarPedido(registerData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Tarefa cadastrada com sucesso',
            icon: 'success'
          }).then(() => {
            this.navCtrl.navigateForward('/cadastro');
          });
        }, error => {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao cadastrar tarefa',
            icon: 'error'
          });
          console.log(error);
        }
      );
    }
  }
