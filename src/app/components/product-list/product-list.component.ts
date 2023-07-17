import { Component, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MatBadgeModule } from '@angular/material/badge';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from 'src/app/services/cart/cart.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { OfferType } from 'src/app/models/offer.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [CurrencyPipe],
  imports: [
    CommonModule,
    MatBadgeModule,
    NgFor,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ProductListComponent {
  products: Product[] = [];
  private firestore: Firestore = inject(Firestore);
  private destroy$ = new Subject();
  cartProducts: CartProduct[] = [];

  constructor(
    private cartService: CartService,
    private offersService: OffersService,
    private currencyPipe: CurrencyPipe
  ) {
    const productsCollection = collection(this.firestore, 'products');
    const products$ = collectionData(productsCollection, {
      idField: 'id',
    }) as Observable<Product[]>;
    products$.pipe(takeUntil(this.destroy$)).subscribe((products) => {
      this.products = products;
      this.checkQtyOfProductsOnCart();
    });
    this.cartService.cartProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartProducts: CartProduct[]) => {
        this.cartProducts = cartProducts;
        this.checkQtyOfProductsOnCart();
      });
    this.offersService.offers$.subscribe((offers) => {
      const offer = offers.find(
        (offer) => offer.type === OfferType.SELECTED_PRODUCTS
      );
      if (offer) {
        this.products
          .filter((product) =>
            offer.selectedProductsIds.includes(Number(product.id))
          )
          .forEach((product) => {
            product.oldPrice = product.price;
            const discount =
              offer.valueType === 'fixed'
                ? offer.value
                : offer.valueType === 'percent'
                ? (product.price * offer.value) / 100
                : 0;
            product.price -= discount;
            product.hasOffer = true;
            product.discount = discount;
            product.discountType = offer.valueType;
            product.discountLabel =
              offer.valueType === 'fixed'
                ? `-${this.currencyPipe.transform(offer.value)} OFF`
                : offer.valueType === 'percent'
                ? `${offer.value}% OFF`
                : '';
          });
        this.products = [...this.products];
      }
    });
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }

  removeFromCart(product: Product, quantity: number) {
    this.cartService.removeFromCart(product, quantity);
  }

  checkQtyOfProductsOnCart(): void {
    this.products.forEach((product) => {
      const found = this.cartProducts.find(
        (cartProduct) => product.id == cartProduct.id
      );
      product.qtyOnCart = found?.quantity ?? 0;
    });
  }
}
