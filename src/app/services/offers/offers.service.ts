import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  offers$: Observable<Offer[]>;
  private firestore: Firestore = inject(Firestore);

  constructor(private toast: MatSnackBar) {
    this.offers$ = collectionData(collection(this.firestore, 'offers'), {
      idField: 'id',
    }) as Observable<Offer[]>;
  }
}
