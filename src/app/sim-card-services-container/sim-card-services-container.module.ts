import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimCardServicesContainerPageRoutingModule } from './sim-card-services-container-routing.module';

import { SimCardServicesContainerPage } from './sim-card-services-container.page';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesContainerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimCardServicesContainerPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SimCardServicesContainerPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [SimCardServicesContainerPage]
})
export class SimCardServicesContainerPageModule {}
