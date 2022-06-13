import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-shipment-que',
  templateUrl: './shipment-que.component.html',
  styleUrls: ['./shipment-que.component.css']
})
export class ShipmentQueComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  rowData: any;
  selectedEntity: any;
  shipmentque:ShipmentQue;
  columnDefs = [
    { headerName:'Lr Id', field: 'LrId', sortable: true, filter: true, checkboxSelection: true ,resizable: true},
    { headerName:'Date', field: 'Date', sortable: true, filter: true ,resizable: true,
    cellRenderer: (data) => {
      return  formatDate(data.value, 'dd/MM/yyyy', this.locale);
    }
    },
    { headerName:'Pickup Point',field: 'Pickuppoint', sortable: true, filter: true,resizable: true },
    { headerName:'Mobile No',field: 'Mobile', sortable: true, filter: true ,resizable: true},
    { headerName:'Action', resizable: true,
    cellRenderer: params => {
      return `<a (click)="onCellClicked("${params.data}")">Accept</a>`;
           }
     },
    
  ];
 

 // rowData: any;
  constructor(@Inject(LOCALE_ID) private locale: string,private api: ApiService,private httpClient: HttpClient) { }

  ngOnInit(): void {
  this.GetShipmentQue()
  }
  GetShipmentQue() {
    this.api.GetShipmentdata(this.shipmentque).subscribe(
      (resp: any) => {
        console.log(resp);
        this.rowData= resp;
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  

// rowData = [
//     { make: 'Toyota', model: 'Celica', price: 35000 ,mobile:9089786745},
//     { make: 'Ford', model: 'Mondeo', price: 32000,mobile:9089786740 },
//     { make: 'Porsche', model: 'Boxter', price: 72000,mobile:9089789745 },
//     { make: 'Toyota', model: 'Celica', price: 35000,mobile:9089788745 },
//     { make: 'Ford', model: 'Mondeo', price: 32000,mobile:9089786545 },
//     { make: 'Porsche', model: 'Boxter', price: 72000,mobile:9089548674 }
// ];

// rowSelected()
// {
//   const selectedrows=this.agGrid.api.getSelectedRows();
//   console.log('selectedrow', selectedrows);
// }
   onRowClicked(event: any) 
   {
      console.log('row', event);
       //  if (this.rowSelection === 'multiple') {
       //   this.selectedEntity = this.grid.api.getSelectedRows();
       // } else {
       //   this.selectedEntity = this.grid.api.getSelectedRows()[0];
      // }
      const selectedrows=this.agGrid.api.getSelectedRows();
      this.shipmentque = this.agGrid.api.getSelectedRows()[0];
      this.shipmentque.Lrstatus="PICKUP_PLANNED";
      this.shipmentque.UserId=localStorage.getItem('UserID');
      this.api.GetCustomerQue(this.shipmentque).subscribe(
        (resp: any) => {
          this.GetShipmentQue();
          console.log(resp);
        },
        (err) => {
          alert('Server Error !!');
        }
      );
     // console.log('selectedrow', selectedrows);
   }
   onCellClicked(event: any) { //console.log('cell', event);
   }
   onSelectionChanged(event: any) {
   //console.log("selection", event);
   const selectedrows=this.agGrid.api.getSelectedRows();
   console.log('selectedrow', selectedrows);
   }
   onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    }
  
  onGridSizeChanged(params: GridSizeChangedEvent) {
    params.api.sizeColumnsToFit();
  }
}
