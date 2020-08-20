import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
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
      description: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
    });
  }


    formataEnvio() {
      const registerDataReturn = {
        description: this.form.get('description').value,
        payment: this.form.get('payment').value,
        // email_client: this.form.get('email').value,
        email_helper: 'not@taken.com',
        is_taken: false,
        pago: false
      };

      return registerDataReturn;
    }
}
