import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimCardServicesContainerChildPage } from './sim-card-services-container-child.page';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesContainerChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimCardServicesContainerChildPageRoutingModule {}
