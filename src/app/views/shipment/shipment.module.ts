import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentQueComponent } from './shipment-que/shipment-que.component';
import { MyQueComponent } from './my-que/my-que.component';
import { UnloadComponent } from './unload/unload.component';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShipmentQueComponent, MyQueComponent, UnloadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShipmentRoutingModule,
    AgGridModule.withComponents([]),
    AutocompleteLibModule
  ],
})
export class ShipmentModule { }
