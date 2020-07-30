import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimCardServicesPageRoutingModule } from './sim-card-services-routing.module';

import { SimCardServicesPage } from './sim-card-services.page';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimCardServicesPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [SimCardServicesPage]
})
export class SimCardServicesPageModule {}
