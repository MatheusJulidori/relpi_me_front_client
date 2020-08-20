import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiDjangoService } from 'src/app/services/api-django.service';
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiDjangoService: ApiDjangoService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      senha: new FormControl('',  [Validators.required]),
      confirmaSenha: new FormControl(null, [Validators.required])
    });

    this.form.get('confirmaSenha').setValidators([this.verificaSenhasIguais(this.form)]);
  }

  verificaSenhasIguais(form: FormGroup) {
    return (control: AbstractControl) => {
      const senha = form.get('senha').value;
      const confirmaSenha = form.get('confirmaSenha').value;

      if (confirmaSenha === '' || confirmaSenha == null) {
        return { required : true } as ValidationErrors;
      } else if (senha !== confirmaSenha) {
        return { senhasDiferentes: true } as ValidationErrors;
      } else {
        return null as ValidationErrors;
      }
    };
  }

  getErrorMessage(form: FormGroup, field) {
    if (form.get(field)) {
      return form.get(field).hasError('required')
        ? 'Campo requerido'
        : form.get(field).hasError('email')
        ? 'E-mail inválido'
        : form.get(field).hasError('senhasDiferentes')
        ? 'As senhas inseridas são diferentes'
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
      email: this.form.get('email').value,
      fullname: this.form.get('nome').value,
      birth_date: this.form.get('dataNascimento').value,
      cidade: this.form.get('cidade').value,
      password: this.form.get('senha').value
    };

    return registerDataReturn;
  }

  register() {
    const registerData = this.formataEnvio();

    this.apiDjangoService.register(registerData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Usuário cadastrado com sucesso',
          icon: 'success'
        }).then(() => {
          this.navCtrl.navigateForward('/login');
        });
      }, error => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao cadastrar usuário',
          icon: 'error'
        });
        console.log(error);
      }
    );
  }
}
