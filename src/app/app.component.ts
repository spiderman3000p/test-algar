import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav/sidenav.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  carItemsCounter = 0;
  destroy$ = new Subject();
  openedSidenav = false;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.openCart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((opened: boolean) => {
        this.openedSidenav = opened;
      });
  }

  onCloseSidenav(): void {
    this.sidenavService.closeCart();
  }
}
