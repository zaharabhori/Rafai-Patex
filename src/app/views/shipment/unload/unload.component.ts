import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { ShipmentQueComponent } from '../shipment-que/shipment-que.component';


// const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
//   'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
//   'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
//   'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
//   'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
//   'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-unload',
  templateUrl: './unload.component.html',
  styleUrls: ['./unload.component.css']
})
export class UnloadComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  shipmentunload: ShipmentQue;
  shipmentdata = new ShipmentQue();
  //keyword = 'Branch';
  keyword = 'Branch';
  data = [];
  // data = [
  //    {
  //      id: 1,
  //      name: 'Dakota Gaylord PhD',
  //      address: '14554 Smith Mews'
  //    },
  //    {
  //      id: 2,
  //      name: 'Maria Legros',
  //      address: '002 Pagac Drives'
  //    },
  //    {
  //      id: 3,
  //      name: 'Brandyn Fritsch',
  //      address: '8542 Lowe Mountain'
  //    },
  //    {
  //      id: 4,
  //      name: 'Glenna Ward V',
  //      address: '1260 Oda Summit'
  //    },
  //    {
  //      id: 5,
  //      name: 'Jamie Veum',
  //      address: '5017 Lowe Route'
  //    }
  // ];


  columnDefs = [
    { headerName: 'Lr Id', field: 'LrId', sortable: true, filter: true, checkboxSelection: true, resizable: true },
    { headerName: 'Date', field: 'Date', sortable: true, filter: true, resizable: true,
    cellRenderer: (data) => {
      return  formatDate(data.value, 'dd/MM/yyyy', this.locale);
    }
    },
    { headerName: 'Pickup Point', field: 'Pickuppoint', sortable: true, filter: true, resizable: true },
    { headerName: 'Mobile No', field: 'Mobile', sortable: true, filter: true, resizable: true },
    {
      headerName: 'Lr Status', field: 'Lrstatus', sortable: true, filter: true, resizable: true
    },
  ];
  // shipment: ShipmentQue;
  constructor(@Inject(LOCALE_ID) private locale: string,private api: ApiService, private httpClient: HttpClient, private myRouter: Router) { }

  ngOnInit() {
    this.GetBranchList();
    this.GetShipmentQue()
  }
  GetShipmentQue() {
    this.shipmentunload = new ShipmentQue();

    this.shipmentunload.Lrstatus = "PICKUP_DONE";
    this.shipmentunload.UserId = localStorage.getItem('UserID');
    this.api.Get_Unload_Que(this.shipmentunload).subscribe(
      (resp: any) => {
        console.log(resp);
        this.rowData = resp;
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  GetBranchList() {
    this.api.GetBranchList().subscribe(
      (resp: any) => {
        console.log(resp);
        this.shipmentunload = resp;
        this.data = resp;

      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  rowData: any;
  UnloadSelected() {
    // do something with selected item
     this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 ,mobile:9089786745,status:'PickUp-Planned'},
        { make: 'Ford', model: 'Mondeo', price: 32000,mobile:9089786740 ,status:'PickUp-Planned'},
        { make: 'Porsche', model: 'Boxter', price: 72000,mobile:9089789745,status:'PickUp-Planned' },
        { make: 'Toyota', model: 'Celica', price: 35000,mobile:9089788745,status:'PickUp-Done' },
        { make: 'Ford', model: 'Mondeo', price: 32000,mobile:9089786545 ,status:'PickUp-Planned'},
        { make: 'Porsche', model: 'Boxter', price: 72000,mobile:9089548674,status:'PickUp-Done' }
    ];
  }

  selectEvent(item) {
    // do something with selected item
    console.log(item);
    this.shipmentdata.Branch = item.Branch;
    this.shipmentdata.FromBranch = item.Branch;
    this.shipmentdata.CurrentBranch = item.Branch;
  }
  onCellClicked(event: any) { //console.log('cell', event);
  }
  onRowClicked(event: any) {
    console.log('selectedrow', event);
    this.shipmentdata.LrId = event.data.LrId;
    this.shipmentdata.Lrstatus = "RECEIVED_AT_BRANCH";
    this.shipmentdata.UserId = localStorage.getItem('UserID');
    if (this.shipmentdata.FromBranch != null) {

      this.api.GetUnloadlist(this.shipmentdata).subscribe(
        (resp: any) => {
          console.log(resp);
          this.GetShipmentQue();
          // this.rowData= resp;
        },
        (err) => {
          alert('Server Error !!');
        }
      );
    }
    else {
      alert('Pls select branch !!');
    }
  }

  onSelectionChanged(event: any) {
    //console.log("selection", event);
    const selectedrows = this.agGrid.api.getSelectedRows();
    console.log('selectedrow', selectedrows);
  }
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    params.api.sizeColumnsToFit();
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
}


