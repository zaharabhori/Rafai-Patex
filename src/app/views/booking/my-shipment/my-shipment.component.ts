import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-my-shipment',
  templateUrl: './my-shipment.component.html',
  styleUrls: ['./my-shipment.component.css']
})
export class MyShipmentComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  rowData: any;
  selectedEntity: any;
  shipmentque:ShipmentQue;
  domLayout = 'autoHeight';
  noOfRows = 0;
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  columnDefs = [
    { headerName:'Lr Id', field: 'LrId', pinned: 'left', lockPinned: true, cellClass: 'lock-pinned',
    sortable: true, filter: true, checkboxSelection: true 
    ,resizable: true ,
    cellRenderer: params => {
      return `<a (click)="onCellClicked("${params.data}")">${ params.value }</a>`;
           } },
    { headerName:'Date', field: 'Date', sortable: true, filter: true ,resizable: true,
    cellRenderer: (data) => {
      return  formatDate(data.value, 'dd/MM/yyyy', this.locale);
    }
    },
    { headerName:'Delivery Point',field: 'Pickuppoint', sortable: true, filter: true,resizable: true },
    { headerName:'Lr Status',field: 'Lrstatus', sortable: true, filter: true ,resizable: true},
    
  ];
  constructor(@Inject(LOCALE_ID) private locale: string,private api: ApiService,private httpClient: HttpClient,private myRouter: Router) { }

  ngOnInit(): void {
    this.GetMyShipment()
    this.noOfRows = Math.round((document.body.clientHeight - 150)/50) -1 ;
  }
  GetMyShipment() {
   this.shipmentque = new ShipmentQue();
   this.shipmentque.Mobile=localStorage.getItem('Mobile');
  // this.shipmentque.UserId=localStorage.getItem('UserID');
    this.api.GetMyQue(this.shipmentque).subscribe(
      (resp: any) => {
        console.log(resp);
        this.rowData= resp;
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  onRowClicked(event: any) 
  {
     console.log('row', event);
     this.myRouter.navigateByUrl('/booking/booking/' + event.data.Row_id + '');
  }
  // onCellClicked(event: any) { 
  //    console.log("selection", event);
  //   this.myRouter.navigateByUrl('/booking');
  //  }
  //  onGridReady(params: GridReadyEvent) {
  //   params.api.sizeColumnsToFit();
  //   }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(window.innerWidth > 820){
      params.api.sizeColumnsToFit();
    }    
  }
  
  onGridSizeChanged(params: GridSizeChangedEvent) {
    // params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(window.innerWidth > 820){
      params.api.sizeColumnsToFit();
    } 
  }
}
