import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  standalone: true,
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class CheckoutDialogComponent {
  private firestore: Firestore = inject(Firestore);
  order: Order = {
    identificationNumber: '',
    address: '',
  };

  constructor(private cartService: CartService) {}

  onCancel(): void {}

  onCheckout(): void {}
}
