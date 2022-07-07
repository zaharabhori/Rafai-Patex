import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { ColumnApi, GridApi, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
@Component({
  selector: 'app-track-shipment',
  templateUrl: './track-shipment.component.html',
  styleUrls: ['./track-shipment.component.css']
})
export class TrackShipmentComponent implements OnInit {
  LRTrack: FormGroup;
  ShipmentQue: ShipmentQue;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  rowData: any;
  domLayout = 'autoHeight';
  noOfRows = 0;
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  columnDefs = [
    { headerName:'City', field: 'City', sortable: true, filter: true,resizable: true,
    },
    { headerName:'LRStatus', field: 'Lrstatus', sortable: true, filter: true ,resizable: true},
    { headerName:'Date', field: 'Date', sortable: true, filter: true ,resizable: true,
    cellRenderer: (data) => {
      return  formatDate(data.value, 'dd MMM yyyy', this.locale);
    }
    },
  ];
  constructor(@Inject(LOCALE_ID) private locale: string,private fb: FormBuilder, private myRouter: Router, private activeroute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.LRTrack = this.fb.group({
      LrId: [''],
      
    });
    this.noOfRows = Math.round((document.body.clientHeight - 150)/50) -1 ;
  }
  get f() {
    return this.LRTrack.controls;
  }
  TrackShipment() {
    this.ShipmentQue= new ShipmentQue;
    this.ShipmentQue.LrId= this.LRTrack.controls['LrId'].value;
    this.api.TrackShipment(this.ShipmentQue).subscribe(
      (resp: any) => {
        console.log(resp);
        this.rowData= resp;
      },
      (err) => {
        alert('Server Error !!');
      }
    );
   console.log('track shipment');
  }

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


