import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPage } from './product-detail.page';

import { ShareModule } from 'src/components/share/share.module';
import { PipesModule } from 'src/pipes/pipes.module';

import {MatExpansionModule, MatIconModule} from '@angular/material'


const routes: Routes = [
  {
    path: '',
    component: ProductDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ShareModule,
    PipesModule,
    MatExpansionModule,
    MatIconModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
