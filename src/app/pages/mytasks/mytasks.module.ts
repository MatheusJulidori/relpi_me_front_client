import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytasksPageRoutingModule } from './mytasks-routing.module';

import { MytasksPage } from './mytasks.page';
import { ApiDjangoService } from 'src/app/services/api-django.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytasksPageRoutingModule
  ],
  declarations: [MytasksPage],
  providers: [ApiDjangoService]
})
export class MytasksPageModule {}
