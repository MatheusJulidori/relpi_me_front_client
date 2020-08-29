import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailsRoutingModule } from './task_details-routing.module';

import { TaskDetailsPage } from './task_details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDetailsRoutingModule
  ],
  declarations: [TaskDetailsPage]
})
export class TaskDetailsModule {}
