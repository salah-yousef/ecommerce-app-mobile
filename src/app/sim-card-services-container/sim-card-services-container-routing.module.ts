import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimCardServicesContainerPage } from './sim-card-services-container.page';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesContainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimCardServicesContainerPageRoutingModule {}
