import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MyQueComponent } from './my-que/my-que.component';
import { ShipmentQueComponent } from './shipment-que/shipment-que.component';
import { UnloadComponent } from './unload/unload.component';

const routes: Routes = [
  // {
  //   path:'shipment',
  //   children:[
      {path:'',canActivate: [AuthGuardService], component: ShipmentQueComponent},
      {path:'myque',canActivate: [AuthGuardService], component: MyQueComponent},
      
      {path:'unload',canActivate: [AuthGuardService], component: UnloadComponent}
    
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
