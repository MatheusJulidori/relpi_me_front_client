import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import {RegistrarpedidosService} from '../../services/registrarpedidos.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private registraPedidoService: RegistrarpedidosService,
      public navCtrl: NavController
      ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      task_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required, Validators.min(0)]),
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
       
        email_client: "null",
        client_name: "teste",
        client_phone: "00000000000",
        is_taken: false,
        email_helper: "null",
        helper_name: "null",
        helper_phone: "null",
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