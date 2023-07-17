import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _openCart$ = new BehaviorSubject<boolean>(false);
  openCart$ = this._openCart$.asObservable();
  constructor() {}

  openCart(): void {
    this._openCart$.next(true);
  }

  closeCart(): void {
    this._openCart$.next(false);
  }

  toggleCart(): void {
    console.log('on toggle');
    this._openCart$.pipe(take(1)).subscribe((opened) => {
      console.log('opened', opened);
      this._openCart$.next(!opened);
    });
  }
}
