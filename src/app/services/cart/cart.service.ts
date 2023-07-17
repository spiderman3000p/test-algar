import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-product.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts$: Observable<CartProduct[]>;
  private firestore: Firestore = inject(Firestore);

  constructor(private toast: MatSnackBar) {
    this.cartProducts$ = collectionData(collection(this.firestore, 'cart'), {
      idField: 'id',
    }) as Observable<CartProduct[]>;
  }

  addToCart(product: Product, qty: number) {
    if (product.qtyOnCart > 0) {
      updateDoc(doc(this.firestore, 'cart/' + product.id), {
        quantity: product.qtyOnCart + qty,
        total: (product.qtyOnCart + qty) * product.price,
        oldUnitPrice: product.oldPrice,
      });
    } else {
      const cartProduct = new CartProduct(product, qty);
      delete cartProduct.id;
      setDoc(doc(this.firestore, 'cart/' + product.id), {
        ...cartProduct,
      }).catch((e) => {
        console.error(e);
        this.toast.open('Error on adding to cart', 'OK', {
          duration: 2000,
          panelClass: 'danger',
        });
      });
    }
  }

  removeFromCart(product: Product, quantity: number) {
    if (product.qtyOnCart - quantity > 0) {
      updateDoc(doc(this.firestore, 'cart/' + product.id), {
        quantity: product.qtyOnCart - quantity,
        total: (product.qtyOnCart - quantity) * product.price,
      });
    } else {
      deleteDoc(doc(this.firestore, 'cart/' + product.id));
    }
  }

  clearCart() {
    getDocs(collection(this.firestore, 'cart')).then((snapshot) =>
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      })
    );
  }

  saveOrder(order: Order) {
    addDoc(collection(this.firestore, 'orders'), order)
      .then((resp) => {
        this.toast.open('Order placed successfully', 'OK', {
          duration: 2000,
          panelClass: 'success',
        });
        this.clearCart();
      })
      .catch((e) => {
        console.error(e);
        this.toast.open('Error saving order', 'OK', {
          duration: 2000,
          panelClass: 'danger',
        });
      });
  }
}
