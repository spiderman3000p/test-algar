import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-product.model';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

const MATERIAL = [
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatButtonModule,
  MatMenuModule,
];

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, NgFor, MATERIAL],
})
export class NavbarComponent {
  cartItemsCounter = 0;
  cart$: Observable<CartProduct[]>;
  private firestore: Firestore = inject(Firestore);
  private destroy$ = new Subject();

  constructor(private sidenavService: SidenavService) {
    const cartCollection = collection(this.firestore, 'cart');
    this.cart$ = collectionData(cartCollection) as Observable<CartProduct[]>;
    this.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartProducts: CartProduct[]) => {
        this.cartItemsCounter = cartProducts.length;
      });
  }

  toggleCart(): void {
    this.sidenavService.toggleCart();
  }
}
