import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimCardServicesContainerChildPageRoutingModule } from './sim-card-services-container-child-routing.module';

import { SimCardServicesContainerChildPage } from './sim-card-services-container-child.page';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesContainerChildPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimCardServicesContainerChildPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [SimCardServicesContainerChildPage]
})
export class SimCardServicesContainerChildPageModule {}
