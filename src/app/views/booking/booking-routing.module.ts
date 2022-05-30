import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

import { BookShipmentComponent } from './book-shipment/book-shipment.component';
import { MyShipmentComponent } from './my-shipment/my-shipment.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ReviewConfirmComponent } from './review-confirm/review-confirm.component';
import { TrackShipmentComponent } from './track-shipment/track-shipment.component';


const routes: Routes = [
  {path:'', component: BookShipmentComponent
  //  , children: [
  //   { path: '', redirectTo: 'new', pathMatch: 'full' },
  //   { path: 'all', component: BookShipmentComponent, data: { title: 'My BookShipment' } },
  //   { path: 'new', component: BookShipmentComponent, data: { title: 'New BookShipment Entry' } },
  //   { path: ':id', component: BookShipmentComponent, data: { title: 'BookShipment Entry' } }
  // //   { path: ':Lrid', component: BookShipmentComponent }
  //   ]
   },
  {
    path: 'booking/:Row_id',
    component: BookShipmentComponent,
  },
  {path:'myshipment', canActivate: [AuthGuardService], component: MyShipmentComponent},
  {path:'trackshipment',canActivate: [AuthGuardService], component: TrackShipmentComponent},
  {path:'paymentgateway',canActivate: [AuthGuardService],component:PaymentGatewayComponent},
  {path:'review',canActivate: [AuthGuardService],component:ReviewConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
