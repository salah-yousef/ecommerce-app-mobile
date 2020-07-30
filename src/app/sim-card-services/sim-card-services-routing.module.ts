import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimCardServicesPage } from './sim-card-services.page';

const routes: Routes = [
  {
    path: '',
    component: SimCardServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimCardServicesPageRoutingModule {}
