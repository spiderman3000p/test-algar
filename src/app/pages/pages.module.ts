import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ProductListComponent,
    PageNotFoundComponent,
    CartComponent,
  ],
})
export class PagesModule {}
