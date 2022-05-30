import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BookingRoutingModule } from './booking-routing.module';
import { BookShipmentComponent } from './book-shipment/book-shipment.component';
import { MyShipmentComponent } from './my-shipment/my-shipment.component';
import { TrackShipmentComponent } from './track-shipment/track-shipment.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReviewConfirmComponent } from './review-confirm/review-confirm.component';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';    
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BookShipmentComponent, MyShipmentComponent, TrackShipmentComponent, PaymentGatewayComponent, ReviewConfirmComponent],
  imports: [
    CommonModule,
  
    ReactiveFormsModule,
    BookingRoutingModule,
    TabsModule.forRoot(),
    AgGridModule.withComponents([]),
    AutocompleteLibModule,
    MatAutocompleteModule,MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
  ],
  exports:[
    MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonModule
  ]
})
export class BookingModule { }
