import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss'],
  imports: [CommonModule, NgFor, MatCardModule, MatButtonModule, RouterModule],
})
export class CartPreviewComponent {
  cartProducts: CartProduct[] = [];
  destroy$ = new Subject();
  @Output() goToShopping = new EventEmitter();

  constructor(private cartService: CartService) {
    this.cartService.cartProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: CartProduct[]) => {
        this.cartProducts = products;
      });
  }

  onGoToShopping(): void {
    this.goToShopping.emit(true);
  }
}
