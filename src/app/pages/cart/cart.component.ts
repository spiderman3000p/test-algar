import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutDialogComponent } from 'src/app/dialogs/checkout/checkout-dialog/checkout-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirm/confirmation-dialog/confirmation-dialog.component';
import { Order } from 'src/app/models/order.model';
import { MatIconModule } from '@angular/material/icon';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  destroy$ = new Subject();
  total = 0;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private offersService: OffersService
  ) {
    this.cartService.cartProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: CartProduct[]) => {
        this.cartProducts = products;
        this.total = this.cartProducts.reduce(
          (prev, curr) => prev + curr.total,
          0
        );
      });
  }

  onCheckout(): void {
    this.dialog
      .open(CheckoutDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((resp) => !!resp)
      )
      .subscribe((order: Order) => {
        this.cartService.saveOrder(order);
      });
  }

  onClearCart(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Are you sure?',
          message: 'All your cart items are going to be deleted.',
          positiveText: 'Yes, delete them',
          negativeText: 'No, keep them',
        },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((resp) => resp)
      )
      .subscribe(() => this.cartService.clearCart());
  }
}
