import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { apiDataInWrap, apiDataOutWrap, ClientSessionInfo, DataState, LookupResult, LrCharge, LrDetail, LrEntryEntity, LrHead, LrHeadDetail, ObjectReference, SaveLREntry, SeedData } from 'src/app/Models/ClientSessionInfo';
import { CustomerArea, Login } from 'src/app/Models/Login';
import { RazorpayClient } from 'src/app/Models/RazorpayClient';
import { ShipmentQue } from 'src/app/Models/ShipmentQue';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-shipment',
  templateUrl: './book-shipment.component.html',
  styleUrls: ['./book-shipment.component.css']
})
export class BookShipmentComponent implements OnInit {
  BookingForm: FormGroup;
  addItems: FormGroup;
  MovingFrom: FormGroup;
  // PersonalDetails: FormGroup;
  ReviewForm: FormGroup;
  PackingType: ObjectReference[] = [];
  defaultPackingType: string = 'CARTOON';
  ItemType: ObjectReference[] = [];
  defaultItemType: string = 'CARTOON BOX';
  GeneralUnits: ObjectReference[] = [];
  defaultUnits: string = 'Kg';
  lrdeatail: LrDetail;
  States: any[] = [];
  CustomerArea: CustomerArea[] = [];
  Consignorlist: ObjectReference[] = [];
  Consigneelist: ObjectReference[] = [];
  IsEditMode: boolean = false;
  Editenable: boolean = false;
  LrRowid: string
  delelement: HTMLElement;
  editelement: HTMLElement;
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  // @ViewChild('delareaAutocomplete') delareaAutocomplete: any;
  // @ViewChild('colareaAutocomplete') colareaAutocomplete: any;

  keyword = 'City';
  Consignor_name = 'Text';
  Consignee_name = 'Text';

  activeTab: TabDirective;
  selectedFile: File;
  messages: Message[] = [];
  seedData = new SeedData();
  lrEntryEntity = new LrEntryEntity();
  olrDetail = new Array<LrDetail>();
  olrCharges = new Array<LrCharge>();
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  Itemlist: LrDetail[] = [];
  filterlist: LrDetail[] = [];
  _lrdetails: LrDetail;
  savelrentry: SaveLREntry;
  step = 1;
  ReviewTab: boolean;
  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
  _login: Login;
  fullname: any;
  Movingto: any;
  LrId: any;
  title: string;
  Savetitle: string;
  employeelogin: string;
  constructor(
    private fb: FormBuilder,
    private myRouter: Router,
    private activeroute: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {

    this.title = "Add Item";

    this.BookingForm = this.fb.group({
      LrId: [''],
      booking_category: ['Baggage_Booking', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddr: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
      gender: ['0'],
      // PaymentType: [ObjectReference,Validators.required],
      fromAddr: ['', Validators.required],
      fromlandmark: ['', Validators.required],
      FromCustomerArea: ['', Validators.required],
      CollectionArea: ['', Validators.required],
      DeliveryArea: ['', Validators.required],
      ToCustomerArea: ['', Validators.required],
      toAddr: ['', Validators.required],
      tolandmark: ['', Validators.required],
      tomobile_no: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.minLength(10), Validators.maxLength(10)]],
      // Consignor: ['', Validators.required],
      // Consignee: ['', Validators.required],
      PaymentType: this.fb.group({
        Code: [''],
        Text: ['To Pay', [Validators.required]],
      })
    })
    this.addItems = this.fb.group({
      PackingType: [ObjectReference, Validators.required],
      //  PackingType: this.fb.group({
      //    Code:[''],
      //    Text:[''],
      //    packingtype: new FormControl(null)
      //   }),
      // ItemType:['', Validators.required],
      //  ItemType: this.fb.group({
      //  // Code:[''],
      //   itemtype:['', [Validators.required] ],
      // }),
      ItemType: [ObjectReference, Validators.required],
      // NoOfBags:['', Validators.required],
      ItemActualWeight: ['', Validators.required],
      ItemChargedWeight: ['', Validators.required],
      GeneralUnits: ['', Validators.required],
      // Generalunits: this.fb.group({
      //   Code:[''],
      //   Text:['', [Validators.required] ],

      // }),
      ItemRate: ['', Validators.required],
      InvoiceNo: ['', Validators.required],
      InvoiceAmount: ['', Validators.required],
      EwayBillNo: ['', Validators.required],
      photograph: [''],

    });

    this.ReviewForm = this.fb.group({
      LrId: [''],
      Booking_Category: [''],
      Gender: [''],
      Name: [''],
      SenderMobNo: [''],
      EmailAddr: [''],
      FromPickUpDetails: [''],
      ToDeliveryDetails: [''],
      PaymentType: [ObjectReference, ''],
      FREIGHT: [''],
      gst_amt: [''],
      GrandTotal: [''],
      received_amount: [''],
      Balance_Amount: ['']
    });


    this.GetSeedData();
    // console.log(this.activeroute.snapshot.params)
    //let IsEditMode: boolean = false;
    // let Lrid: string = this.activeroute.snapshot.params.Lrid;
    this.LrRowid = this.activeroute.snapshot.params.Row_id;
    // console.log(this.LrRowid);
    if (this.LrRowid == undefined) {
      this.IsEditMode = false;
      this.Editenable = true;
      this.Savetitle = "Procced To Pay";
      this.GetPersonalDetails();
    }
    else {
      this.IsEditMode = true;
      this.Savetitle = "Save";
      this.employeelogin = localStorage.getItem('UserName');
      if (this.employeelogin != undefined || this.employeelogin != null) {
        this.Editenable = true;
      }
      else { this.Editenable = false; }
      this.GetLrEntityGraph(this.LrRowid);

    }
    this.BookingForm.valueChanges.subscribe(val => {
      localStorage.setItem("Bookingformvalue", JSON.stringify(this.BookingForm.value));
      // let bfv = (JSON.parse(localStorage.getItem('Bookingformvalue')));
      // console.log(bfv);
    });


  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  formNext() {
    this.step = this.step + 1;
    this.stepChange()
  }

  formPrev() {
    this.step = this.step - 1;
    this.stepChange()
  }

  stepChange() {
    const progressStep = this.el.nativeElement.querySelector('.progress')
    const progressWidth = (this.step-1)*20
    const progressWidthStr = String(progressWidth) + "%"
    this.renderer.setStyle(progressStep, 'width', progressWidthStr)
  }

 

  GetSeedData() {
    let oInput: apiDataInWrap = new apiDataInWrap();
    oInput.context = 0;
    oInput.component = 11;
    oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
    oInput.dataInPacket = new Array<string>();
    //let values: any = new Dictionary<string, string>();
    let values: { [key: string]: string; } = {};
    values[""] = "8600000000";
    oInput.dataInPacket.push(JSON.stringify(values));

    this.api.GetSeedData(oInput).subscribe(
      (resp: any) => {
        // console.log(resp);
        this.seedData.ListData = JSON.parse(resp.dataOutPacket[0]);
        //let oInput: apiDataInWrap = new apiDataInWrap();
        // this.seedData.LrValidations = JSON.parse(resp.dataOutPacket[1]);
        this.seedData.NewLrEntities = JSON.parse(resp.dataOutPacket[2]);
        this.seedData.AppVariables = JSON.parse(resp.dataOutPacket[3]);
        this.seedData.ChargeTemplate = JSON.parse(resp.dataOutPacket[4]);
        this.seedData.GcId = JSON.parse(resp.dataOutPacket[5]);
        this.seedData.WeightMasterData = JSON.parse(resp.dataOutPacket[6]);
        this.seedData.GstTaxDetails = JSON.parse(resp.dataOutPacket[7]);
        this.seedData.DDCRate = JSON.parse(resp.dataOutPacket[8]);
        //let environment.seedData:SeedData=this.seedData;
        //localStorage.setItem('SeedData', this.seedData);
        let packingtype = this.seedData.ListData.filter(
          p => p.ListName === 'PACKAGING_TYPES');
        // console.log(packingtype)
        var oPackingType: any[] = [];
        packingtype.forEach(function (value) {
          // console.log(value.ListOptions);

          oPackingType.push(value.ListOptions)

        });
        this.PackingType = oPackingType;


        let itemtype = this.seedData.ListData.filter(
          p => p.ListName === 'ITEM_LIST');
        // console.log(itemtype)
        var oItemType: any[] = [];
        itemtype.forEach(function (value) {
          // console.log(value.ListOptions);
          oItemType.push(value.ListOptions)
        });
        this.ItemType = oItemType;

        let units = this.seedData.ListData.filter(
          p => p.ListName === 'GEN_UNITS');
        // console.log(units)
        var oUnits: any[] = [];
        units.forEach(function (value) {
          //  console.log(value.ListOptions);

          oUnits.push(value.ListOptions)

        });
        this.GeneralUnits = oUnits;

        let states = this.seedData.ListData.filter(
          p => p.ListName === 'STATE');
        // console.log(units)
        var oStates: any[] = [];
        states.forEach(function (value) {
          // console.log(value.ListOptions);

          oStates.push(value.ListOptions)

        });
        this.States = oStates;
        // console.log(this.seedData);
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  GetLrEntityGraph(LrRowid: any) {

    let oInput: apiDataInWrap = new apiDataInWrap();
    oInput.context = 2;
    oInput.component = 11;
    oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();

    oInput.dataInPacket = new Array<string>();
    let values: { [key: string]: string; } = {};
    values["HeaderRowId"] = this.LrRowid;
    values["EntityId"] = '';
    oInput.dataInPacket.push(JSON.stringify(values));

    this.api.SaveData(oInput).subscribe(
      (resp: any) => {
        console.log(resp);
        this.lrEntryEntity = new LrEntryEntity();
        this.lrEntryEntity = JSON.parse(resp.dataOutPacket[0]);
        this.BookingForm.patchValue(this.lrEntryEntity.lrHead);

        let collectionarea_val = this.lrEntryEntity.lrHead.CollectionArea.Text.replace(/\s/g, "");
        this.BookingForm.controls['CollectionArea'].setValue(collectionarea_val);
        let deliveryarea_val = this.lrEntryEntity.lrHead.DeliveryArea.Text.replace(/\s/g, "");
        this.BookingForm.controls['DeliveryArea'].setValue(deliveryarea_val);
        // this.BookingForm.value.CollectionArea=this.lrEntryEntity.lrHead.CollectionArea;

        this.BookingForm.controls['FromCustomerArea'].setValue(this.lrEntryEntity.lrHead.AddressLine1);
        this.BookingForm.controls['ToCustomerArea'].setValue(this.lrEntryEntity.lrHead.AddressLine2);

        //this.BookingForm.value.DeliveryArea=this.lrEntryEntity.lrHead.DeliveryArea;

        this.BookingForm.value.PaymentType = this.lrEntryEntity.lrHead.PaymentType;

        let val = this.lrEntryEntity.lrHead.gender.toString()
        this.BookingForm.controls['gender'].setValue(val);
        this.Itemlist = this.lrEntryEntity.lrDetails;
        console.log(this.Itemlist)
        this.filterlist = this.Itemlist;
        this.ReviewForm.patchValue(this.lrEntryEntity.lrCharges);
        if (this.lrEntryEntity.lrHead.PaymentType.Text == 'Paid' || this.employeelogin != undefined || this.employeelogin != null) {
          // let deletele = <HTMLElement>document.querySelector('#btnDelete') as HTMLElement;
          // if (deletele != null) {
          //   deletele.setAttribute('disabled', 'true');
          // }
          // let editele = <HTMLElement>document.querySelector('#btnEdit') as HTMLElement;
          // if (editele != null) {
          //   editele.setAttribute('disabled', 'true');
          // }
          // let saveele = <HTMLElement>document.querySelector('#btnSave') as HTMLElement;
          // console.log(saveele)
          // if (saveele != null) {
          //   saveele.setAttribute('disabled', 'true');
          // }

          this.BookingForm.disable();
          // this.addItems.disable();
          this.ReviewForm.disable();
          this.BookingForm.controls['emailAddr'].enable();
          this.Editenable = true;

        }
        else {
          this.BookingForm.disable();
          this.addItems.disable();
          this.ReviewForm.disable();
          this.BookingForm.controls['emailAddr'].enable();

        }
      },
      (err) => {
        alert('Server Error !!');
      }
    );

  }
  GetPersonalDetails() {
    let jsondata = localStorage.getItem('User');
    if (jsondata != null) {
      let data = JSON.parse(jsondata);
      let val = data.Gender.toString();
      this.BookingForm.controls['gender'].setValue(val);
      this.BookingForm.controls['firstName'].setValue(data.FirstName);
      this.BookingForm.controls['lastName'].setValue(data.LastName);
      this.BookingForm.controls['emailAddr'].setValue(data.Email);
      this.BookingForm.controls['mobileNo'].setValue(data.Mobile);

    }
    else {
      this._login = new Login();
      this._login.Mobile = localStorage.getItem('Mobile');

      this.api.GetCustomerPersonalDetails(this._login).subscribe(
        (resp: any) => {
          //  console.log(resp);
          this.BookingForm.patchValue(resp);
          let genderValue = resp.gender.toString();
          //console.log(genderValue);
          this.BookingForm.controls['gender'].patchValue(genderValue);
        },
        (err) => {
          alert('Server Error !!');
        }
      );
    }
  }
  get I() {
    return this.addItems.controls;
  }
  get f() {
    return this.BookingForm.controls;
  }
  get r() {
    return this.ReviewForm.controls;
  }
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;

  }
  onTabChanged($event) {
    let clickedIndex = $event.index;
    console.log(clickedIndex)
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Review & Confirmation") {
      // alert('Review & Confirmation')

      if (this.IsEditMode) {

        this.BookingForm.enable();
        this.addItems.enable();
        //this.ReviewForm.enable();
        this.ReviewForm.controls['LrId'].setValue(this.lrEntryEntity.lrHead.LrId);
        this.ReviewForm.controls['GrandTotal'].setValue(this.lrEntryEntity.lrHead.GrandTotal);
        this.ReviewForm.controls['received_amount'].setValue(this.lrEntryEntity.lrHead.received_amount);
        if (this.lrEntryEntity.lrHead.CollectionArea != null) {
          this.BookingForm.controls['CollectionArea'].setValue(this.lrEntryEntity.lrHead.CollectionArea.Text.replace(/\s/g, ""));
        }
        if (this.lrEntryEntity.lrHead.DeliveryArea != null) {
          this.BookingForm.controls['DeliveryArea'].setValue(this.lrEntryEntity.lrHead.DeliveryArea.Text.replace(/\s/g, ""));
        }

        this.BookingForm.value.CollectionArea = this.lrEntryEntity.lrHead.CollectionArea;
        this.BookingForm.value.DeliveryArea = this.lrEntryEntity.lrHead.DeliveryArea;
        for (let i of this.lrEntryEntity.lrCharges) {
          if (i.ChargeHead.Text == 'FREIGHT') {
            let freight_val = i.Amount;
            this.ReviewForm.controls['FREIGHT'].setValue(freight_val);
          }
          if (i.ChargeHead.Text == 'SGST') {
            let gstamount = i.Amount;
            this.ReviewForm.controls['gst_amt'].setValue(gstamount);
          }
        }
        let mobileno = localStorage.getItem('Mobile');
        // if (!mobileno) {
        //   this.ReviewForm.controls['gst_amt'].disable({ onlySelf: true });
        //   this.ReviewForm.controls['FREIGHT'].disable({ onlySelf: true });
        //   this.ReviewForm.controls['GrandTotal'].disable({ onlySelf: true });
        // }

      }
      else {
        // this.ReviewForm.controls['gst_amt'].disable({onlySelf: true});
        // this.ReviewForm.controls['FREIGHT'].disable({onlySelf: true});
        // this.ReviewForm.controls['GrandTotal'].disable({onlySelf: true});


      }

      this.ReviewForm.controls['Booking_Category'].setValue(this.BookingForm.value.booking_category);
      this.ReviewForm.controls['Gender'].setValue(this.BookingForm.value.gender);
      this.ReviewForm.controls['Name'].setValue(this.BookingForm.value.firstName);
      this.ReviewForm.controls['SenderMobNo'].setValue(this.BookingForm.value.mobileNo);
      this.ReviewForm.controls['EmailAddr'].setValue(this.BookingForm.value.emailAddr);
      this.ReviewForm.controls['PaymentType'].setValue(this.BookingForm.value.PaymentType.Text);
      this.ReviewForm.controls['FromPickUpDetails'].setValue(this.BookingForm.value.FromCustomerArea);
      this.ReviewForm.controls['ToDeliveryDetails'].setValue(this.BookingForm.value.ToCustomerArea);

    }
    else if (this.activeTab.heading === "Select Shipment Type") {
      if (this.BookingForm.value.PaymentType.Text == "Paid") {
        this.BookingForm.disable();
        // this.addItems.disable();
        // this.ReviewForm.disable();
      }

    }

  }

  url = '';
  photograph = '';
  imagepath = '';
  onFileChanged(event) {
    //   this.selectedFile = event.target.files[0]
    //  // console.log(event);
    // this.url = this.selectedFile.name;
    if (event.target.files) {

      // const photograph = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result;
        // this.image=event.target.result;
      }
      // let oInput: apiDataInWrap = new apiDataInWrap();
      // oInput.dataInPacket = new Array<string>();
      // var t = JSON.stringify(event.target.files[0]);
      // console.log(t);
      // oInput.dataInPacket.push(t);
      this.api.UploadFile(event.target.files[0]).subscribe(
        (resp: any) => {
          console.log(resp);
          let data = JSON.parse(resp);
          if (data.IsSuccess) {
            // this.url= '';
            this.photograph = data.Data;
            this.imagepath = data.code;
            // this.addItems.controls['photograph'].setValue(this.photograph);
          }
          else {
            alert('Please upload file with ".jpg", ".jpeg", ".gif", ".bmp", ".png",".doc", ".docx", ".pdf",".txt" extension');

          }
        },
        (err) => {
          alert('Server Error !!');
        }
      );
    }
  }
  DeleteFile() {
    this.url = null;
  }
  ConsignorSelectedEvent(ConsignorSelected) {
    // do something with selected item
    console.log(ConsignorSelected)

    // this.BookingForm.controls['Consignor'].setValue(ConsignorSelected);
    // if (!this.IsEditMode) {
    // this.lrEntryEntity.lrHead= new LrHead();
    // }
    // this.lrEntryEntity.lrHead= new LrHead();
    // this.lrEntryEntity.lrHead.Consignor = new ObjectReference();
    // this.lrEntryEntity.lrHead.Consignor.Text=ConsignorSelected.Text;
    // this.lrEntryEntity.lrHead.Consignor.Code=ConsignorSelected.Code;
  }

  ConsigneeSelectedEvent(ConsigneeSelected) {
    // do something with selected item
    console.log(ConsigneeSelected)

  }

  MovingfromselectEvent(delitem) {
    // do something with selected item
    console.log(delitem)

    this.fullname = "City:" + delitem.City + ", District:" + delitem.District + "-" + delitem.Pincode + ", State:" + delitem.State
    this.BookingForm.controls['FromCustomerArea'].setValue(this.fullname);
    if (!this.IsEditMode) {
      this.lrEntryEntity.lrHead = new LrHead();
    }
    this.lrEntryEntity.lrHead.CollectionArea = new ObjectReference();
    //this.lrEntryEntity.lrHead.CollectionArea=this.BookingForm.value.CollectionArea;
    // console.log(this.BookingForm.value.CollectionArea);
    this.lrEntryEntity.lrHead.CollectionArea.Text = delitem.City;
    this.lrEntryEntity.lrHead.CollectionArea.Code = delitem.City_Row_id;
  }
  MovingtoselectEvent(item) {

    this.Movingto = "City:" + item.City + ", District:" + item.District + "-" + item.Pincode + ", State:" + item.State
    this.BookingForm.controls['ToCustomerArea'].setValue(this.Movingto);
    if (!this.IsEditMode) {
      this.lrEntryEntity.lrHead = new LrHead();
    }
    this.lrEntryEntity.lrHead.DeliveryArea = new ObjectReference();
    // this.lrEntryEntity.lrHead.DeliveryArea=this.BookingForm.value.DeliveryArea;
    this.lrEntryEntity.lrHead.DeliveryArea.Text = item.City;
    this.lrEntryEntity.lrHead.DeliveryArea.Code = item.City_Row_id;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (val != null) {
      if (val.length < 3) {
        this.CustomerArea = [];
      }
      else {


        //   let values: { [key: string]: string; } = { };
        //  // values{["UserInputText"] :val} ;
        //  var t = JSON.stringify(val);
        //  var value = JSON.parse(t);
        //   let oParms: { [key: string]: string; } = {["UserInputText"]:value };
        //   let oInput: apiDataInWrap = new apiDataInWrap();
        //   oInput.context = 0;
        //   oInput.component = 12;
        //   oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
        //   oInput.dataInPacket = new Array<string>();
        //   let sLookupParms: string = "{'LookupObjectName': 'area','LookupContext': '0','ExcludeRowIds': '-1','RequestedPageNo': 1,'PromoteCall': true,'LookupForm': { 'UserInputText': '%{userinput}%' }}";
        //    sLookupParms = sLookupParms.replace("{userinput}", oParms["UserInputText"]);
        //    sLookupParms = sLookupParms.replace("'", "\"");

        //    let jsondata="\r\n            {\r\n        \t\"LookupObjectName\": \"area\",\r\n        \t\"LookupContext\": \"0\",\r\n        \t\"ExcludeRowIds\": \"-1\",\r\n        \t\"RequestedPageNo\": 1,\r\n        \t\"PromoteCall\": true,\r\n        \t\"LookupForm\": { \"UserInputText\": \"%value%\" }\r\n            }";
        //    jsondata.replace("%value",val)
        //   oInput.dataInPacket.push(jsondata);
        let oInput: apiDataInWrap = new apiDataInWrap();
        oInput.dataInPacket = new Array<string>();
        var t = JSON.stringify(val);
        // console.log(t);
        oInput.dataInPacket.push(t);
        this.api.GetBookingLocationLookupData(oInput).subscribe(
          (resp: any) => {

            var CustomerAreas: any[] = [];
            resp.forEach(function (value) {
              CustomerAreas.push(value);
              //  console.log(CustomerAreas)
            });
            this.CustomerArea = CustomerAreas;
            console.log(this.CustomerArea)
          },
          (err) => {
            alert('Server Error !!');
          }
        );
      }
      // let LocationSuggestions = GetBookingLocationLookupData(val);
      // this.FromCity = LocationSuggestions.ToList();
      // }
    }
  }
  onConsignorSearch(Consignorvalue: string) {

    if (Consignorvalue != null) {
      if (Consignorvalue.length < 3) {
        this.Consignorlist = [];
      }
      else {
        let oLookupResult = new LookupResult();
        // let apiDataOut: apiDataOutWrap = new apiDataOutWrap();
        let values: { [key: string]: string; } = {};
        // values{["UserInputText"] :val} ;
        var t = JSON.stringify(Consignorvalue);
        var value = JSON.parse(t);
        let oParms: { [key: string]: string; } = { ["UserInputText"]: value };
        let oInput: apiDataInWrap = new apiDataInWrap();
        oInput.context = 0;
        oInput.component = 12;
        oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
        oInput.dataInPacket = new Array<string>();
        let sLookupParms: string = "{'LookupObjectName': 'bus_cust','LookupContext': '0','ExcludeRowIds': '-1','RequestedPageNo': 1,'PromoteCall': true,'LookupForm': { 'UserInputText': '%{userinput}%' }}";
        sLookupParms = sLookupParms.replace("{userinput}", oParms["UserInputText"]);
        // sLookupParms = sLookupParms.replace("'", "\"");

        oInput.dataInPacket.push(sLookupParms);
        // console.log(oInput)
        this.api.SaveData(oInput).subscribe(
          (resp: any) => {
            console.log(resp);
            oLookupResult = JSON.parse(resp.dataOutPacket[0]);

            let apiDataOut = new apiDataOutWrap()
            apiDataOut.Result = 1;
            apiDataOut.ErrorMsg = '';
            apiDataOut.dataOutPacket = new Array<string>();
            apiDataOut.dataOutPacket.push(JSON.stringify(oLookupResult.LookupData));
            let list = new Array<ObjectReference>();
            this.Consignorlist = JSON.parse(apiDataOut.dataOutPacket[0]);
            // console.log(this.Consignorlist );

          }
        );
      }

    }
  }


  onConsigneeSearch(Consigneevalue: string) {

    if (Consigneevalue != null) {
      if (Consigneevalue.length < 3) {
        this.Consignorlist = [];
      }
      else {
        let oLookupResult = new LookupResult();
        // let apiDataOut: apiDataOutWrap = new apiDataOutWrap();
        let values: { [key: string]: string; } = {};
        // values{["UserInputText"] :val} ;
        var t = JSON.stringify(Consigneevalue);
        var value = JSON.parse(t);
        let oParms: { [key: string]: string; } = { ["UserInputText"]: value };
        let oInput: apiDataInWrap = new apiDataInWrap();
        oInput.context = 0;
        oInput.component = 12;
        oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
        oInput.dataInPacket = new Array<string>();
        let sLookupParms: string = "{'LookupObjectName': 'bus_cust','LookupContext': '0','ExcludeRowIds': '-1','RequestedPageNo': 1,'PromoteCall': true,'LookupForm': { 'UserInputText': '%{userinput}%' }}";
        sLookupParms = sLookupParms.replace("{userinput}", oParms["UserInputText"]);
        // sLookupParms = sLookupParms.replace("'", "\"");

        oInput.dataInPacket.push(sLookupParms);
        // console.log(oInput)
        this.api.SaveData(oInput).subscribe(
          (resp: any) => {
            console.log(resp);
            oLookupResult = JSON.parse(resp.dataOutPacket[0]);

            let apiDataOut = new apiDataOutWrap()
            apiDataOut.Result = 1;
            apiDataOut.ErrorMsg = '';
            apiDataOut.dataOutPacket = new Array<string>();
            apiDataOut.dataOutPacket.push(JSON.stringify(oLookupResult.LookupData));
            let list = new Array<ObjectReference>();
            this.Consigneelist = JSON.parse(apiDataOut.dataOutPacket[0]);
            // console.log(this.Consignorlist );

          }
        );
      }

    }
  }

  onFocused(e) {
    // do something when input is focused
  }
  public onOptionsSelected(event) {
    const value = event.target.value;

    //  console.log(value);
  }
  AddItems() {
    if (this.title === "Add Item") {
      this.lrdeatail = new LrDetail();

      this.lrdeatail.ItemType = new ObjectReference();
      this.lrdeatail.ItemType = this.addItems.value.ItemType;
      // let val=this.addItems.value.ItemType

      this.lrdeatail = this.addItems.value;
      this.lrdeatail.DataState = new DataState();
      this.lrdeatail.DataState.DBAction = 2;
      this.lrdeatail.PartNoObjRef = new ObjectReference();
      // console.log(this.addItems.value);
      this.lrdeatail.photograph = this.imagepath;
      this.Itemlist.push(this.lrdeatail);
      for (let i of this.Itemlist) {
        if (this.lrdeatail.InvoiceNo == i.InvoiceNo) {
          i.EwayBillNo = this.lrdeatail.EwayBillNo;
        }
      }
      this.olrDetail.push(this.lrdeatail);
      console.log(this.Itemlist)
      // this.filterlist=this.Itemlist;
      //this.CreateItems(this.Itemlist);
      this.addItems.reset();
      this.url = ''
    }
    else if (this.title === "Update") {
      console.log(this.Itemlist)
      const newItem = this.Itemlist.findIndex(el => el.InvoiceNo == this._lrdetails.InvoiceNo);
      this._lrdetails = this.addItems.value;

      this._lrdetails.photograph = this.imagepath;
      if (this.IsEditMode) {
        this._lrdetails.DataState = new DataState();
        this._lrdetails.DataState.DBAction = 1;
      }
      else {
        this._lrdetails.DataState = new DataState();
        this._lrdetails.DataState.DBAction = 2;
      }
      this._lrdetails.PartNoObjRef = new ObjectReference();
      this.olrDetail[newItem] = this._lrdetails;
      console.log(this.olrDetail[newItem]);
      this.Itemlist[newItem] = this.olrDetail[newItem];
      // this.filterlist=this.Itemlist;



      this.addItems.reset();
      this.url = ''
      this.title = "Add Item";
    }


  }


  Edititem(lrdeatail: LrDetail) {
    this._lrdetails = lrdeatail;
    console.log(this._lrdetails)
    this.title = "Update";
    if (this.lrEntryEntity.lrDetails != undefined || this.lrEntryEntity.lrDetails != null) { this.Itemlist = this.lrEntryEntity.lrDetails; }

    // this.filterlist=this.Itemlist;
    if (lrdeatail != null) {
      this.addItems.patchValue(lrdeatail);
      //let packingtype_val= lrdeatail.PackingType.Text.replace(/\s/g, "");
      //this.addItems.controls['PackingType'].setValue(packingtype_val);
      this.addItems.controls['PackingType'].setValue(lrdeatail.PackingType);
      this.addItems.controls['ItemType'].setValue(lrdeatail.ItemType);
      this.addItems.controls['GeneralUnits'].patchValue(lrdeatail.GeneralUnits);
      // this.addItems.controls['ItemActualWeight'].patchValue(lrdeatail.ItemActualWeight);
      // this.addItems.controls['ItemChargedWeight'].patchValue(lrdeatail.ItemChargedWeight);
      // this.addItems.controls['ItemRate'].patchValue(lrdeatail.ItemRate);
      // this.addItems.controls['InvoiceNo'].patchValue(lrdeatail.InvoiceNo);
      // this.addItems.controls['InvoiceAmount'].patchValue(lrdeatail.InvoiceAmount);
      // this.addItems.controls['EwayBillNo'].patchValue(lrdeatail.EwayBillNo);
    }
    //this.addItems.patchValue(lrdeatail);
    this.url = this.photograph;
  }

  Deleteitem(Item: LrDetail) {

    if (confirm("Are you sure to delete " + Item.InvoiceNo)) {
      if (this.lrEntryEntity.lrDetails != undefined || this.lrEntryEntity.lrDetails != null) {
        for (let i of this.lrEntryEntity.lrDetails) {
          if (Item.InvoiceNo == i.InvoiceNo) {
            i.DataState.DBAction = -1;
          }
        }
        this.olrDetail = this.lrEntryEntity.lrDetails;
        localStorage.setItem("olrDetail", JSON.stringify(this.olrDetail));
        let index = this.Itemlist.findIndex(e => e.InvoiceNo == Item.InvoiceNo);
        this.Itemlist.splice(index, 1)
        this.olrDetail = (JSON.parse(localStorage.getItem('olrDetail')));

      }
      else {
        // this.Itemlist.filter( i => i.InvoiceNo !== Item.InvoiceNo)
        let index = this.Itemlist.findIndex(e => e.InvoiceNo == Item.InvoiceNo);
        // this.Itemlist['i'][index].hidden = true;
        this.Itemlist.splice(index, 1)
      }
    }
  }
  Cancel() {
    this.addItems.reset();
    this.url = ''
    this.title = "Add Item";
  }
  submitForm() {
    //console.log(this.BookingForm.value);
    this.ReviewTab = true;
    this.BookingForm = this.BookingForm.value;

  }

  options = {
    "key": "rzp_test_rEnj14xeusjAJM", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Admin",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },

    "prefill": {
      "name": "rcpl",
      "email": "rcpl@gmail.com",
      "contact": "8600000000"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }

  };
  rzp1;
  sumItemQty: number = 0;
  sumItemActualWeight: number = 0;
  sumInvoiceAmount: number = 0;
  histList = new Array<string>();
  Save() {

    if (!this.IsEditMode) {

      this.lrEntryEntity = new LrEntryEntity();
      // this.olrDetail = new Array<LrDetail>();
      // this.olrDetail = this.Itemlist;

      for (let i of this.Itemlist) {
        // this.sumItemQty += i.ItemQty;
        this.sumItemActualWeight += i.ItemActualWeight;
        this.sumInvoiceAmount += i.InvoiceAmount;
        this.histList.push(i.InvoiceNo);
      }
      //this.lrEntryEntity.lrHead.TotalQty=this.sumItemQty;
      this.lrEntryEntity.lrHead = new LrHead();
      this.lrEntryEntity.lrHead.TotalWeight = this.sumItemActualWeight;
      this.lrEntryEntity.lrHead.InvoiceValue = this.sumInvoiceAmount;
      this.lrEntryEntity.lrHead.InvoiceNumber = this.histList.join(",");

      this.olrCharges = new Array<LrCharge>();
      let freight: LrCharge = new LrCharge();
      freight.Amount = this.ReviewForm.value.FREIGHT;
      freight.ChargeHead = new ObjectReference();
      freight.ChargeHead.Text = 'FREIGHT';
      freight.ChargeHead.Code = '268435583';
      freight.BusinessProcessOwner = new ObjectReference();
      freight.ChargeBusinessProcess = new ObjectReference();
      freight.ChargeBusinessProcess.Code = '268435565';
      freight.ChargeBusinessProcess.Text = 'BOOKING_BP';
      freight.DataState = new DataState();

      if (this.seedData.NewLrEntities.lrCharges != null) {
        var odatastate: any[] = [];
        this.seedData.NewLrEntities.lrCharges.forEach(function (value) {

          odatastate.push(value.DataState.DBAction)

        });
        freight.DataState.DBAction = odatastate;

      }
      else {
        freight.DataState = this.seedData.NewLrEntities.lrHead.lrHead.DataState;
      }
      this.olrCharges.push(freight);

      let gst: LrCharge = new LrCharge();
      gst.Amount = this.ReviewForm.value.gst_amt;
      gst.ChargeHead = new ObjectReference();
      gst.ChargeHead.Code = '268435466';
      gst.ChargeHead.Text = 'SGST';
      gst.BusinessProcessOwner = new ObjectReference();
      gst.ChargeBusinessProcess = new ObjectReference();
      gst.ChargeBusinessProcess.Code = '268435565';
      gst.ChargeBusinessProcess.Text = 'BOOKING_BP';
      gst.DataState = new DataState();

      if (this.seedData.NewLrEntities.lrCharges != null) {
        var odatastate: any[] = [];
        this.seedData.NewLrEntities.lrCharges.forEach(function (value) {

          odatastate.push(value.DataState.DBAction)

        });
        gst.DataState.DBAction = odatastate;

      }
      else {
        gst.DataState = this.seedData.NewLrEntities.lrHead.lrHead.DataState;
      }
      this.olrCharges.push(gst);

      //for save lrhead
      this.lrEntryEntity.lrHead = this.BookingForm.value
      this.lrEntryEntity.lrHead.created_by_customer = localStorage.getItem('Mobile');
      this.lrEntryEntity.lrHead.CreationDate = new Date();
      this.lrEntryEntity.lrHead.ReportingDate = new Date();
      this.lrEntryEntity.lrHead.FranchiseAgent = new ObjectReference();
      this.lrEntryEntity.lrHead.ChallanId = new ObjectReference();
      this.lrEntryEntity.lrHead.UserCreated = new ObjectReference();
      this.lrEntryEntity.lrHead.CollectionType = new ObjectReference();
      this.lrEntryEntity.lrHead.Consignor = new ObjectReference();
      this.lrEntryEntity.lrHead.Consignor.Code = '2';
      this.lrEntryEntity.lrHead.Consignee = new ObjectReference();
      this.lrEntryEntity.lrHead.Consignee.Code = '2';
      // this.lrEntryEntity.lrHead.Consignee = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingParty = new ObjectReference();

      this.lrEntryEntity.lrHead.BillingParty = this.lrEntryEntity.lrHead.Consignor;
      this.lrEntryEntity.lrHead.FromBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.ToBranch = new ObjectReference();

      this.lrEntryEntity.lrHead.CreatedByBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.ChargeTmpl = new ObjectReference();
      this.lrEntryEntity.lrHead.TaxTmpl = new ObjectReference();
      this.lrEntryEntity.lrHead.VehicleType = new ObjectReference();
      this.lrEntryEntity.lrHead.DeliveryType = new ObjectReference();
      this.lrEntryEntity.lrHead.OperationalStatus = new ObjectReference();
      this.lrEntryEntity.lrHead.OperationalStatus.Text = 'Booking';
      this.lrEntryEntity.lrHead.OperationalStatus.Code = '268435473';
      this.lrEntryEntity.lrHead.LrType = new ObjectReference();
      this.lrEntryEntity.lrHead.CurrentBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.CreatedForAccount = new ObjectReference();
      this.lrEntryEntity.lrHead.Route = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingStatus = new ObjectReference();
      this.lrEntryEntity.lrHead.CreatedForBusDept = new ObjectReference();
      this.lrEntryEntity.lrHead.CollectionStatus = new ObjectReference();
      this.lrEntryEntity.lrHead.CollectionAddress = new ObjectReference();
      this.lrEntryEntity.lrHead.DeliveryAddress = new ObjectReference();
      this.lrEntryEntity.lrHead.LrState = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingStationBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.ServiceTaxPayableBy = new ObjectReference();
      this.lrEntryEntity.lrHead.InsuranceBy = new ObjectReference();
      this.lrEntryEntity.lrHead.InsuranceCompany = new ObjectReference();
      this.lrEntryEntity.lrHead.Contact = new ObjectReference();
      this.lrEntryEntity.lrHead.VehicleNo = new ObjectReference();
      this.lrEntryEntity.lrHead.PayableBy = new ObjectReference();
      this.lrEntryEntity.lrHead.GowdownBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.CCType = new ObjectReference();
      this.lrEntryEntity.lrHead.ToCity = new ObjectReference();
      this.lrEntryEntity.lrHead.City = new ObjectReference();
      this.lrEntryEntity.lrHead.ReceiptMode = new ObjectReference();
      this.lrEntryEntity.lrHead.TransportMode = new ObjectReference();
      this.lrEntryEntity.lrHead.ModificationReason = new ObjectReference();
      this.lrEntryEntity.lrHead.AddressCountry = new ObjectReference();
      this.lrEntryEntity.lrHead.AddressState = new ObjectReference();
      this.lrEntryEntity.lrHead.AddressDistrict = new ObjectReference();
      this.lrEntryEntity.lrHead.AddressCity = new ObjectReference();
      this.lrEntryEntity.lrHead.PartyBranch = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingStationConsignor = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingStationConsignee = new ObjectReference();
      this.lrEntryEntity.lrHead.BillingStationBlp = new ObjectReference();
      // this.lrEntryEntity.lrHead.PaymentType = new ObjectReference();
      this.lrEntryEntity.lrHead.PaymentType.Text = this.BookingForm.value.PaymentType.Text
      this.lrEntryEntity.lrHead.gst_amt = this.ReviewForm.value.gst_amt;
      this.lrEntryEntity.lrHead.GrandTotal = this.ReviewForm.value.GrandTotal;
      this.lrEntryEntity.lrHead.received_amount = this.ReviewForm.value.GrandTotal;
      // this.lrEntryEntity.lrHead.CollectionArea = new ObjectReference();
      // this.lrEntryEntity.lrHead.CollectionArea=this.BookingForm.value.CollectionArea;
      this.lrEntryEntity.lrHead.CollectionArea.Code = this.BookingForm.value.CollectionArea.City_Row_id;
      this.lrEntryEntity.lrHead.CollectionArea.Text = this.BookingForm.value.CollectionArea.City;
      //  this.lrEntryEntity.lrHead.DeliveryArea = new ObjectReference();
      //this.lrEntryEntity.lrHead.DeliveryArea=this.BookingForm.value.DeliveryArea;
      this.lrEntryEntity.lrHead.DeliveryArea.Code = this.BookingForm.value.DeliveryArea.City_Row_id;
      this.lrEntryEntity.lrHead.DeliveryArea.Text = this.BookingForm.value.DeliveryArea.City;
      if (this.BookingForm.value.PaymentType.Text == "Paid") {
        this.lrEntryEntity.lrHead.PaymentType.Text = this.BookingForm.value.PaymentType.Text;
        this.lrEntryEntity.lrHead.PaymentType.Code = '268435464';
      }
      else {
        this.lrEntryEntity.lrHead.PaymentType.Text = this.BookingForm.value.PaymentType.Text;
        this.lrEntryEntity.lrHead.PaymentType.Code = '268435463';
      }


      this.lrEntryEntity.lrHead.DataState = new DataState();
      this.lrEntryEntity.lrHead.DataState = this.seedData.NewLrEntities.lrHead.lrHead.DataState;


      //this.seedData.GcId.GcIdScheme = null;
      this.seedData.GcId.NumRange = null;
      this.lrEntryEntity.CargoData = JSON.stringify(this.seedData.GcId);

      //  oInput.dataInPacket.Add(JsonConvert.SerializeObject(lrEntryEntity));

      this.lrEntryEntity.lrDetails = this.olrDetail;
      this.lrEntryEntity.lrCharges = this.olrCharges;


      let oInput: apiDataInWrap = new apiDataInWrap();
      oInput.context = 16;
      oInput.component = 11;
      oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
      oInput.dataInPacket = new Array<string>();
      oInput.dataInPacket.push(JSON.stringify(this.lrEntryEntity));
      if (this.IsEditMode) {

      }
      else {
        this.api.SaveData(oInput).subscribe(
          (resp: any) => {
            if (resp.Result > 0) {
              console.log(resp);
              // this.LrId=resp;
              this.savelrentry = new SaveLREntry();
              this.savelrentry = JSON.parse(resp.dataOutPacket[0]);
              if (this.savelrentry != null) {
                this.Pay();

              }
              alert("Data saved successfully!!")
              this.Itemlist = null;
            }
            else { alert("Failed to save data!!") }

          },
          (err) => {
            alert('Server Error !!');
          }
        );
      }

      // this.ReviewForm.reset();
    }
    else if (this.IsEditMode) {
      let olrDetaildata: LrDetail[] = new Array<LrDetail>();
      let olrChargesdata: LrCharge[] = new Array<LrCharge>();
      // this.BookingForm.patchValue(this.lrEntryEntity.lrHead);
      // this.addItems.patchValue(this.lrEntryEntity.lrDetails);
      this.lrEntryEntity.lrHead.booking_category = this.BookingForm.value.booking_category;
      this.lrEntryEntity.lrHead.firstName = this.BookingForm.value.firstName;
      this.lrEntryEntity.lrHead.lastName = this.BookingForm.value.lastName;
      this.lrEntryEntity.lrHead.gender = this.BookingForm.value.gender;
      this.lrEntryEntity.lrHead.mobileNo = this.BookingForm.value.mobileNo;
      this.lrEntryEntity.lrHead.fromAddr = this.BookingForm.value.fromAddr;
      this.lrEntryEntity.lrHead.fromlandmark = this.BookingForm.value.fromlandmark;
      this.lrEntryEntity.lrHead.toAddr = this.BookingForm.value.toAddr;
      this.lrEntryEntity.lrHead.tolandmark = this.BookingForm.value.tolandmark;
      this.lrEntryEntity.lrHead.tomobile_no = this.BookingForm.value.tomobile_no;
      this.lrEntryEntity.lrHead.emailAddr = this.BookingForm.value.emailAddr;
      this.lrEntryEntity.lrHead.OperationalStatus = new ObjectReference();
      // if (!localStorage.getItem('Mobile')) {
      //   this.lrEntryEntity.lrHead.OperationalStatus.Text = 'Pickup done';
      //   this.lrEntryEntity.lrHead.OperationalStatus.Code = '268436103';
      // }
      // else {
      this.lrEntryEntity.lrHead.OperationalStatus.Text = 'Booking';
      this.lrEntryEntity.lrHead.OperationalStatus.Code = '268435473';
      // }

      this.lrEntryEntity.lrHead.PaymentType = new ObjectReference();
      if (this.BookingForm.value.PaymentType.Text == "Paid") {
        this.lrEntryEntity.lrHead.PaymentType.Text = this.BookingForm.value.PaymentType.Text;
        this.lrEntryEntity.lrHead.PaymentType.Code = '268435464';
      }
      else {
        this.lrEntryEntity.lrHead.PaymentType.Text = this.BookingForm.value.PaymentType.Text;
        this.lrEntryEntity.lrHead.PaymentType.Code = '268435463';
      }

      this.lrEntryEntity.lrHead.GrandTotal = this.ReviewForm.value.GrandTotal;
      this.lrEntryEntity.lrHead.received_amount = this.ReviewForm.value.GrandTotal;
      this.lrEntryEntity.lrHead.CollectionArea = new ObjectReference();
      this.lrEntryEntity.lrHead.CollectionArea = this.BookingForm.value.CollectionArea;
      // this.lrEntryEntity.lrHead.CollectionArea.Code=this.BookingForm.value.CollectionArea.Code;
      // this.lrEntryEntity.lrHead.CollectionArea.Text=this.BookingForm.value.CollectionArea.Text;
      this.lrEntryEntity.lrHead.DeliveryArea = new ObjectReference();
      this.lrEntryEntity.lrHead.DeliveryArea = this.BookingForm.value.DeliveryArea;
      // this.lrEntryEntity.lrHead.DeliveryArea.Code=this.BookingForm.value.DeliveryArea.Code;
      // this.lrEntryEntity.lrHead.DeliveryArea.Text=this.BookingForm.value.DeliveryArea.Text;
      this.lrEntryEntity.lrHead.DataState = new DataState();
      this.lrEntryEntity.lrHead.DataState.DBAction = 1;
      this.seedData.GcId.NumRange = null;
      this.lrEntryEntity.CargoData = JSON.stringify(this.seedData.GcId);

      this.lrEntryEntity.lrDetails = this.addItems.value
      // array.forEach(element => {

      // });

      if (this.lrEntryEntity.lrCharges != null) {
        for (let i of this.lrEntryEntity.lrCharges) {
          if (i.ChargeHead.Text == 'FREIGHT') {
            // let lrCharges:LrCharge = new LrCharge();
            // lrCharges.RowId = i.RowId;
            //  lrCharges.ParentRowId = i.ParentRowId;
            i.ParentRowId = this.lrEntryEntity.lrHead.RowId;
            //  i.Amount = this.ReviewForm.value.FREIGHT;

            i.ChargeBusinessProcess = new ObjectReference();
            i.ChargeBusinessProcess.Code = '268435565';
            i.ChargeBusinessProcess.Text = 'BOOKING_BP';
            i.DataState = new DataState();
            i.DataState.DBAction = 1;

            olrChargesdata.push(i);
          }
          if (i.ChargeHead.Text == 'SGST') {
            // i.RowId=268435466;
            i.ParentRowId = this.lrEntryEntity.lrHead.RowId;
            // i.Amount = this.ReviewForm.value.gst_amt;
            i.ChargeBusinessProcess = new ObjectReference();
            i.ChargeBusinessProcess.Code = '268435565';
            i.ChargeBusinessProcess.Text = 'BOOKING_BP';
            if (i.RowId < 0) {
              i.RowId = 268435466;
              i.DataState = new DataState();
              i.DataState.DBAction = 2;
            }
            else {
              i.DataState = new DataState();
              i.DataState.DBAction = 1;
            }

            olrChargesdata.push(i);
          }

        }

      }
      if (this.olrDetail != null) {
        for (let i of this.olrDetail) {

          let lrDetaildata: LrDetail = new LrDetail();
          lrDetaildata.RowId = i.RowId;
          lrDetaildata.ParentRowId = i.ParentRowId;
          lrDetaildata.ItemQty = i.ItemQty;
          lrDetaildata.ItemRate = i.ItemRate;
          lrDetaildata.InvoiceNo = i.InvoiceNo;
          lrDetaildata.ItemActualWeight = i.ItemActualWeight;
          lrDetaildata.ItemChargedWeight = i.ItemChargedWeight;
          lrDetaildata.InvoiceAmount = i.InvoiceAmount;
          lrDetaildata.ItemType = new ObjectReference();
          lrDetaildata.ItemType.Code = i.ItemType.Code;
          lrDetaildata.ItemType.Text = i.ItemType.Text;
          lrDetaildata.PackingType = new ObjectReference();
          lrDetaildata.PackingType.Code = i.PackingType.Code;
          lrDetaildata.PackingType.Text = i.PackingType.Text;
          lrDetaildata.GeneralUnits = new ObjectReference();
          lrDetaildata.GeneralUnits.Code = i.GeneralUnits.Code;
          lrDetaildata.GeneralUnits.Text = i.GeneralUnits.Text;
          lrDetaildata.PartNoObjRef = new ObjectReference();
          lrDetaildata.DataState = new DataState();
          if (i.DataState.DBAction > 1) {
            lrDetaildata.DataState.DBAction = 2;
          }
          else if (i.DataState.DBAction == -1) {
            lrDetaildata.DataState.DBAction = -1;
          }
          else {
            lrDetaildata.DataState.DBAction = 1;
          }
          olrDetaildata.push(lrDetaildata);
        }
      }

      this.lrEntryEntity.lrDetails = olrDetaildata;
      this.lrEntryEntity.lrCharges = olrChargesdata;
      for (let i of this.Itemlist) {
        //  this.sumItemQty += i.ItemQty;
        this.sumItemActualWeight += i.ItemActualWeight;
        this.sumInvoiceAmount += i.InvoiceAmount;
        this.histList.push(i.InvoiceNo);
      }
      // this.lrEntryEntity.lrHead.TotalQty=this.sumItemQty;
      this.lrEntryEntity.lrHead.TotalWeight = this.sumItemActualWeight;
      this.lrEntryEntity.lrHead.InvoiceValue = this.sumInvoiceAmount;
      this.lrEntryEntity.lrHead.InvoiceNumber = this.histList.join(",");
      this.lrEntryEntity.lrHead.DataState.DBAction = 1;
      let oInput: apiDataInWrap = new apiDataInWrap();
      oInput.context = 16;
      oInput.component = 11;
      oInput.ClientSessionInfo = ClientSessionInfo.GetInstance();
      oInput.dataInPacket = new Array<string>();
      oInput.dataInPacket.push(JSON.stringify(this.lrEntryEntity));
      this.api.SaveData(oInput).subscribe(
        (resp: any) => {
          console.log(resp);
          alert("Data saved sucessfully !!")
          // this.Pay();
          // this.BookingForm.reset();
          //this.addItems.reset();
          // this.ReviewForm.reset();
          this.Itemlist = null;
          if (!localStorage.getItem('Mobile')) {
            // this.myRouter.navigateByUrl('/shipment/myque');
          }
          else {
            this.myRouter.navigateByUrl('/booking/myshipment');
          }
        },
        (err) => {
          alert('Server Error !!');
        }
      );
    }
    // this.BookingForm.reset();

  }
  Pay() {
    this.options.amount = (this.ReviewForm.value.GrandTotal * 100).toString();
    this.options.name = this.BookingForm.value.firstName;
    this.options.prefill.contact = this.BookingForm.value.mobileNo
    this.options.prefill.name = this.BookingForm.value.firstName;
    this.options.prefill.email = this.BookingForm.value.emailAddr;

    // if (this.IsEditMode)
    // {
    //   //this.options.order_id = this.ReviewForm.value.LrId.toString();
    // }
    // else
    // {
    //   this.options.order_id = this.LrId.toString();
    // }



    const key = "rzp_test_rEnj14xeusjAJM";

    const secret = "fgTDQYcefLw9GmtM1Pd4COnS"


    this.options.handler = ((response) => {
      let pay_id = response.razorpay_payment_id;
      console.log(response);
      let oInput: apiDataInWrap = new apiDataInWrap();
      oInput.dataInPacket = new Array<string>();
      let values: { [key: string]: string; } = {};
      // values["lr_id"] = this.ReviewForm.value.LrId;
      values["lr_id"] = this.savelrentry.SavedGcId;
      values["razorpay_payment_id"] = pay_id;
      values["razorpay_order_id"] = '';
      values["razorpay_status"] = 'Paid'
      values["ops_status"] = 'BOOKING'
      var t = JSON.stringify(values);

      oInput.dataInPacket.push(t);
      this.api.SavePaymentResponse(oInput).subscribe(
        (resp: any) => {
          console.log(resp);
          alert("Amount Paid !!")
          this.ReviewForm.reset();
        },
        (err) => {
          alert('Server Error !!');
        }
      );
    });

    //  this.rzp1.on('payment.failed', function (response){
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    //    });
    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open();

  }
  focusFunction() {
    let totalamount = (this.ReviewForm.value.FREIGHT + this.ReviewForm.value.gst_amt)
    this.ReviewForm.controls['GrandTotal'].setValue(totalamount);

  }
  balancefocusFunction() {
    let balanceamount = (this.ReviewForm.value.GrandTotal - this.ReviewForm.value.received_amount)
    this.ReviewForm.controls['Balance_Amount'].setValue(balanceamount);
  }
  PickupComplete() {
    let shipmentque = new ShipmentQue();
    shipmentque.LrId = this.ReviewForm.value.LrId.toString();

    //   this.lrEntryEntity.lrHead.OperationalStatus.Code = '268436103';
    shipmentque.Lrstatus = 'Pickup done';
    shipmentque.UserId = localStorage.getItem('UserID');
    this.api.PickupComplite(shipmentque).subscribe(
      (resp: any) => {
        console.log(resp);
        if (!localStorage.getItem('Mobile')) {
          this.myRouter.navigateByUrl('/shipment/myque');
        }
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
}


