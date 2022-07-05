import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-my-que',
  templateUrl: './my-que.component.html',
  styleUrls: ['./my-que.component.css']
})
export class MyQueComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: any;
  selectedEntity: any;
  shipmentque: ShipmentQue;
  domLayout = 'autoHeight';
  pageNumber = 10;
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    {
      headerName: 'Lr Id', field: 'LrId', pinned: 'left', lockPinned: true, cellClass: 'lock-pinned', sortable: true, filter: true,
      // cellRenderer: function(params) {
      //  // console.log(params.data.LrId);
      //   return '<a href="/booking/' + params.value.LrId + '">' + params.value + '</a>';
      // }
      cellRenderer: params => {
        return `<a (click)="onCellClicked("${params.data}")">${params.value}</a>`;
      }
    },
    {
      headerName: 'Date', field: 'Date', sortable: true, filter: true,
      cellRenderer: (data) => {
        return formatDate(data.value, 'dd/MM/yyyy', this.locale);
      }
    },
    { headerName: 'Pickup Point', field: 'Pickuppoint', sortable: true, filter: true},
    { headerName: 'Mobile No', field: 'Mobile', sortable: true, filter: true },
    {
      headerName: 'Action', field: 'Lrstatus', sortable: true, filter: true
    },

  ];
  defaultColDef: ColDef = {
    resizable: true,
  };
  constructor(@Inject(LOCALE_ID) private locale: string, private api: ApiService, private httpClient: HttpClient, private myRouter: Router) { }

  ngOnInit(): void {
    this.GetShipmentQue()
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  GetShipmentQue() {
    this.shipmentque = new ShipmentQue();

    this.shipmentque.Lrstatus = "PICKUP_PLANNED";
    this.shipmentque.UserId = localStorage.getItem('UserID');
    this.api.GetMyQue(this.shipmentque).subscribe(
      (resp: any) => {
        console.log(resp);
        this.rowData = resp;
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }


  onRowClicked(event: any) {
    console.log('row', event);
    if(event.data.Lrstatus !== 'PICKUP_DONE'){
      this.myRouter.navigateByUrl('/booking/booking/' + event.data.Row_id + '');
    }
  }
  // onCellClicked(event: any) { 
  //    console.log("selection", event);
  //   this.myRouter.navigateByUrl('/booking');
  //  }
  onSelectionChanged(event: any) {
    //console.log("selection", event);
    const selectedrows = this.agGrid.api.getSelectedRows();
    console.log('selectedrow', selectedrows);
  }
}
