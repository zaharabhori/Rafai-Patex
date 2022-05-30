import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LayoutComponent } from './template/layout/layout.component';
import { CustomerLoginComponent } from './views/customer-login/customer-login.component';
import { CustomerSignInComponent } from './views/customer-sign-in/customer-sign-in.component';
import { EmployeeLoginComponent } from './views/employee-login/employee-login.component';

import { OtpComponent } from './views/otp/otp.component';
const routes: Routes = [
 
  { path: '',redirectTo:'/login', pathMatch:'full' },
   // { path: 'booking', loadChildren: './views/booking/booking.module#BookingModule' },
    
    // path: '',
    // component: LayoutComponent,
  
    // children: [
    //   { path: '', redirectTo: '/login', pathMatch: 'full' },
     
    //   { path: 'booking', loadChildren: './views/booking/booking.module#BookingModule' },
    //   { path: 'shipment', loadChildren: './views/shipment/shipment.module#ShipmentModule' }
      
    // ],
  
  //{ path: 'shipment', loadChildren: './views/shipment/shipment.module#ShipmentModule' },
  {
    path: '',
    component: LayoutComponent,
  
    children: [
     // { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '', redirectTo: '/employeelogin', pathMatch: 'full' },
      { path: 'booking', canActivate: [AuthGuardService],
      loadChildren: () => import('./views/booking/booking.module').then(m => m.BookingModule)
      // loadChildren: './views/booking/booking.module#BookingModule' 
      },
      { path: 'shipment', canActivate: [AuthGuardService],
      // loadChildren: './views/shipment/shipment.module#ShipmentModule' 
      loadChildren: () => import('./views/shipment/shipment.module').then(m => m.ShipmentModule)
      }
    ],
  },
  { path: 'login', component: CustomerLoginComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'signin', component: CustomerSignInComponent },
  { path: 'employeelogin', component: EmployeeLoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
