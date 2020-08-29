import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor() { }

  public appPages = [
    {
      title: 'Nome',
     // url: 'edit-name',
      icon: 'pencil'
    },
    {
      title: 'Número de telefone',
     // url: 'edit-phone',
      icon: 'call'
    },
    {
      title: 'E-mail',
     // url: 'edit-mail',
      icon: 'mail'
    },
  ];

  ngOnInit() {
  }

}
