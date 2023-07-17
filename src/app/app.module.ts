import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { CheckoutDialogComponent } from './dialogs/checkout/checkout-dialog/checkout-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirm/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NavbarComponent,
    MatSidenavModule,
    MatSnackBarModule,
    CartPreviewComponent,
    CheckoutDialogComponent,
    ConfirmationDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
