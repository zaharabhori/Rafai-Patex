import { environment } from "src/environments/environment";

export class ClientSessionInfo{
    static GetInstance(): ClientSessionInfo {
      let oClientSessionInfo: ClientSessionInfo = new ClientSessionInfo();
      oClientSessionInfo.GuiSessionId = "Patex";
      oClientSessionInfo.DotNetSessionId = "Patex";
     // let  userId = localStorage.getItem('UserID');
      let Customer =localStorage.getItem('Mobile');
      if(Customer!= null)
      {
        oClientSessionInfo.LoginUserId = localStorage.getItem('Mobile');
      }
      else
      {
        //oClientSessionInfo.LoginUserId = localStorage.getItem('UserID');
        oClientSessionInfo.LoginUserId = localStorage.getItem('UserName');
      }
      
      oClientSessionInfo.LoginBranchRowId = environment.LoginBranchRowId;
      oClientSessionInfo.LoginBusAccRowId = environment.LoginBusAccRowId;
      oClientSessionInfo.LoginBusDeptRowId = environment.LoginBusDeptRowId;
      return oClientSessionInfo;
    }
    public GuiSessionId: string ;
    public DotNetSessionId: string ;
    public  LoginUserId: string ;
    public  LoginBranchRowId: string; 
    public  LoginBusAccRowId: string ;
    public  LoginBusDeptRowId: string ;
}
export class LookupResult
    {
        public  DialogTitle :string
        public  SearchFormHtml :string
        public  GridColumnsHtml :string
        public  IsMultiSelect:boolean 
        public  SqlQuery:string 
        public  ActualPageNo:number 
        public  PageSize:number 
        public  ReturnedRecords:number 
        public  TotalRecords:number 
        public  NoOfPages:number 
        public  LookupData:Array<ObjectReference>; 
    }
export class SaveLREntry
    {
        public  IsLrEntryPrintable :string
        public  SaveMsg :string
        public  SavedGcId :string
        public  SavedRowId:string 
        public  NextGcIdHint:string 
    }
export class apiDataInWrap
{
    public  component : number;
    public  context : number;
    public ClientSessionInfo : ClientSessionInfo;
    public  dataInPacket :Array<string>;
}
export class apiDataOutWrap
{
    public  Result : any;
    public  ErrorMsg : string;
    public  dataOutPacket :Array<string>;
}

export class SeedData {
    
  public  ListData: Array<ListData> ;
  
  public  NewLrEntities: LrEntryEntity ;
  
  public  AppVariables: AppVariables ;
  
  public  ChargeTemplate: Array<ChargeTemplate> ;
  
  public  GcId: GcId ;
  
  public  WeightMasterData: Array<WeightMasterData> ;
  
  public  GstTaxDetails: Array<GstTaxDetails>;
  
  public  DDCRate: Array<DDCRate> ;
}
export class ListData {
    
  public  ListName: string ;
  
  public  ListOptions: Array<ObjectReference> 
}

export class ObjectReference {
    
  public  Code: string 
  
  public  Text: string 
  
  public constructor () {
      this.Code = "-1";
      this.Text = null;
  }
}
export class BaseDataEntity
    {
        public  ReadOnly :Boolean
        public  LockedByUserId:string 
        public  CargoData :string
        
    }
    export class BaseDataObject {
    
      public  DataState: DataState 
  }
  export class DataState {
      
      public  DBAction: any 
    
      public  Valid: Boolean 
      
      public  Filtered: Boolean 
      
      public constructor () {
          
          this.Valid = false;
          this.Filtered = false;
      }
  }
  export class LrEntryEntity extends BaseDataEntity {
    
    public  lrHead: LrHead ;
    
    public  lrCharges: Array<LrCharge> ;
    
    public  lrDetails: Array<LrDetail> ;
    
    public  Issaved: boolean ;
  }
    export class LrHeadDetail extends BaseDataObject {
    
      public RowId: number;
      
      public ContractExecuteStage: any;
      
      public LrId: string;
      
      public CreationDate :Date= new Date();
      
      public IsLrEntryEditable: Boolean;
      
      public IsLrEntryPrintable: Boolean;
      
      public IsChallanPrepared: Boolean;
      
      public IsGdmPrepared: Boolean;
      
      public EntryDate :Date = new Date();
      
      public GrandTotal: number;
      
      public StationaryId: string;
      
      public CustLrId: string;
      
      public ContractId: string;
      
      public InvoiceValue: number;
      
      public InvoiceNumber: string;
      
      public TotalQty: number;
      
      public TotalWeight: number;
      
      public Remarks: string;
      
      public FranchiseRefNo: string;
      
      public FranchiseChallanNo: string;
      
      public FranchiseChallan:Date = new Date();
      
      public FranchiseAgent: ObjectReference;
      
      public Foc: number;
      
      public ESugamNo: string;
      
      public DirectPrint: Boolean;
      
      public IsCod: number;
      
      public CodAmount: number;
      
      public ReportingDate:Date = new Date();
      
      public CCAttach: Boolean;
      
      public IsPodCreated: number;
      
      public IsViewedInLoadingSheet: number;
      
      public ServiceTax: number;
      
      public PVTRemarks: string;
      
      public InnerQty: number;
      
      public AirDetails: string;
      
      public Self: Boolean;
      public IsFreeGc: Boolean;
      public IsReverseGc: Boolean;
      public EwayBillNumber: string;
      public IsEwayNoExempted: Boolean;
      public ChallanId: ObjectReference;
      
      public UserCreated: ObjectReference;
      
      public CollectionType: ObjectReference;
      
      public Consignor: ObjectReference;
      
      public IsWalkinConsignor: Boolean;
      
      public WalkinConsignor: string;
      
      public WalkinConsignorPincode: string;
      
      public Consignee: ObjectReference;
      
      public IsWalkinConsignee: Boolean;
      
      public WalkinConsignee: string;
      
      public WalkinConsigneePincode: string;
      
      public BillingParty: ObjectReference;
      
      public ConsignorGstNo: string;
      
      public ConsigneeGstNo: string;
      
      public BillingPartyGstNo: string;
      
      public FromBranch: ObjectReference;
      
      public FromBranchStateRowId: number;
      
      public ToBranch: ObjectReference;
      
      public ToBranchStateRowId: number;
      public  BillingPartyStateRowId:number ; 
      public  ConsignorStateRowId :number;
      public  ConsigneeStateRowId :number;
      public DeliveryArea: ObjectReference;
      
      public DeliveryAreaDetails: string;
      
      public CollectionArea: ObjectReference;
      
      public CreatedByBranch: ObjectReference;
      
      public ChargeTmpl: ObjectReference;
      
      public TaxTmpl: ObjectReference;
      
      public VehicleType: ObjectReference;
      
      public DeliveryType: ObjectReference;
      
      public OperationalStatus: ObjectReference;
      
      public LrType: ObjectReference;
      
      public CurrentBranch: ObjectReference;
      
      public PaymentType: ObjectReference;
      
      public CreatedForAccount: ObjectReference;
      
      public Route: ObjectReference;
      
      public BillingStatus: ObjectReference;
      
      public CreatedForBusDept: ObjectReference;
      
      public CollectionStatus: ObjectReference;
      
      public CollectionAddress: ObjectReference;
      
      public DeliveryAddress: ObjectReference;
      
      public LrState: ObjectReference;
      
      public BillingStationBranch: ObjectReference;
      
      public ServiceTaxPayableBy: ObjectReference;
      
      public InsuranceBy: ObjectReference;
      
      public InsuranceCompany: ObjectReference;
      
      public Contact: ObjectReference;
      
      public VehicleNo: ObjectReference;
      
      public ParkingId: string;
      
      public PayableBy: ObjectReference;
      
      public GowdownBranch: ObjectReference;
      
      public CCType: ObjectReference;
      
      public ToCity: ObjectReference;
      
      public City: ObjectReference;
      
      public ReceiptMode: ObjectReference;
      
      public TransportMode: ObjectReference;
      
      public ModificationReason: ObjectReference;
      
      public PartyName: string;
      
      public PartyGstNo: string;
      
      public AddressLine1: string;
      
      public AddressLine2: string;
      
      public AddressPincode: string;
      public  CellNo : string;
      public  EmailId : string;
      public AddressCountry: ObjectReference;
      
      public AddressState: ObjectReference;
      
      public AddressDistrict: ObjectReference;
      
      public AddressCity: ObjectReference;
      
      public PartyBranch: ObjectReference;
      
      public BillingStationConsignor: ObjectReference;
      
      public IsCreditAllowedConsignor: boolean;
      
      public ServiceTaxByCodeConsignor: string;
      
      public  BillingStationConsignee: ObjectReference;
      
      public IsCreditAllowedConsignee: boolean;
      
      public ServiceTaxByCodeConsignee: string;
      
      public BillingStationBlp: ObjectReference;
      
      public IsCreditAllowedBlp: boolean;
      
      public ServiceTaxByCodeBlp: String;
      
      public IsWeightChange: boolean;
      
      public gender: number;
      
      public  firstName : String;
      
      public  lastName : String;
     
      public  mobileNo: String; 
      
      public  emailAddr: String; 
      
      public  fromAddr : String;
      
      public  fromlandmark : String;

      public toAddr : String;
     
      public  tolandmark : String;
      
      public  tomobile_no : String;
     
      public  declaration : String;
      
      public  packingSlip : String;
     
      public  gst_amt :number;
     
      public booking_category: String; 
     
      public  receiver_name: String; 

      public Assignee2User: number; 
     
      public  created_by_customer: String; 
      public received_amount:number;
      public LrHeadDetail()
      {
          this.DirectPrint = true;
          this.ContractExecuteStage = -1;
          this.IsLrEntryEditable = true;
          this.IsLrEntryPrintable = true;
          this.IsGdmPrepared = false;
          this.IsChallanPrepared = false;
          this.IsWalkinConsignor = false;
          this.IsWalkinConsignee = false;
      }
      // public LrHeadDetail()
      // {
        
      // }
      // public  booking_category:string ;
      // public  CollectionArea :ObjectReference;
      // public  Consignee:ObjectReference ;
      // public  Consignor:ObjectReference ;
      // public  DataStatus:number ;
      // public  declaration:string ;
      // public  DeliveryArea:ObjectReference ;
      // public  emailAddr :string;
      // public  firstName :string;
      // public  fromAddr:string ;
      // public  fromlandmark :string;
      // public  gender:number;
      // public  grandTotal:number ;
      // public  gst_amt:number ;
      // public  lastName:string ;
      // public  lr_colled_at2area:string ;
      // public  lr_del_area2area:string ;
      // public  LrId:string ;
      // public  mobileNo:string ;
      // public  packingSlip:string ;
      // public  PaymentType:ObjectReference ;
      // public  Pincode:string ;
      // public  receiver_name:string ;
      // public  RejectReason:string ;
      // public  RowId:number ;
      // public  toAddr:string ;
      // public  ToBranch:ObjectReference ;
      // public  tolandmark:string ;
      // public  tomobile_no:string ;
      // public  TransportMode:ObjectReference ;
      // public  VehicleNo:ObjectReference ;
    
  }
  export class LrHead extends LrHeadDetail {
    public lrHead: LrHeadDetail;
      
    public lrCharges: Array<LrCharge>;
    
    public lrDetails: Array<LrDetail>;
  }
   
    export class LrCharge extends BaseDataObject {
    
      public RowId: number;
      
      public ParentRowId: number;
      
      public Amount: number;
      
      public ChargeHead: ObjectReference;
      
      public ChargeBusinessProcess: ObjectReference;
      
      public BilledRowId: number;
      
      public BusinessProcessOwner: ObjectReference;
      
      public ChargeCode: string;
      
      public CreatedDate : Date = new Date();
      
      public UpdatedDate : Date = new Date();
      public LrCharge()
        {
           // this.BilledRowId = 0;
        }
     }
    
    
    export class LrDetail extends BaseDataObject
    {
        public  RowId:number ;
        public  ItemType:ObjectReference ;
        public  ParentRowId:number ;
        public  ItemRate: number ;
       // public  ContractRate:number ;
        public  ItemQty:number ;
        public  ItemActualWeight:number;
        public  ItemChargedWeight :number ;
        public  InvoiceNo:string ;
        public  InvoiceAmount :number;
       
        // public  Distance :number;
        // public  ItemLength:number ;
        // public  ItemHeight:number ;
        // public  ItemWidth :number;
        // public  ConsgmtCharges:number ;
        // public  CollectionCharges:number ;
        // public  DeliveryCharges:number ;
        // public  GodownCharges :number;
        public  ItemDescription:string ;
        public  PackingType :ObjectReference;
        public  GeneralUnits :ObjectReference;
        public  GeneralUnits_Row_id :number;
        public PartNoObjRef:ObjectReference;
       // public  InvoiceDate:string ;
       // public  PartNo:string ;
       // public  Pieces:string ;
       // public  EdiNo:string ;
       
       // public  CreatedDate : Date = new Date();
       // public  UpdatedDate : Date = new Date(); 
        public  EwayBillNo:string ;
        public  docket_no :number ;
        public  suitcase :string ;
        public  photograph :string ;
        public LrDetail()
        {
          //  this.ContractRate = 0;
        }

    }
    export class GstTaxDetails {
    
      public RowId: number;
      
      public CgstReg: number;
      
      public SgstReg: number;
      
      public IgstReg: number;
      
      public UgstReg: number;
      
      public CgstNonReg: number;
      
      public SgstNonReg: number;
      
      public IgstNonReg: number;
      
      public UgstNonReg?: number;
      
      public EffectiveDate? : Date = new Date();
      
      public Active: Boolean;
  }

  export class DDCRate {
    
    public RowId: number;
    
    public FromKm: number;
    
    public ToKm: number;
    
    public FromKg: number;
    
    public ToKg: number;
    
    public Rate: number;
    }
    export class ContractChargesHead {
    
      public ContractId: string;
      
      public ContractType: string;
      
      public IsHamali: Boolean;
      
      public IsOda: Boolean;
      
      public Cft: number;
  }



export class NumRange {
  public  StartNum: number 
  public  EndNum: number 
}
//getGcIdScheme
export class GcId
{
  public MaxDigits: number;
    
  public IsFranchiseBranch: boolean;
  
  public NextGcIdHint: string;
  
  public AlfaCode: string;
  
  public GcIdScheme: number;
  
  public PrintType: number;
  
  public GcIdLength: number;
  
  public FromBranchStateRowId: number;
  
  public NumRange: Array<NumRange>;
  
  public DeliveryTypeRowId: number;
  
  public IsApplyGst: boolean;
  
  public IsZeroFreightAllowed: boolean;
}
//getAppVariables
export class AppVariables {
    
  public  ACTWT_COND_CHK: string 
  public  ADDRESS_COMPARE: string 
  public  ALLCONRFORGODOWNBRANCHWISE: string 
    public  ARCO_STAX_COND: string 
  public  AUTOWEIGHT: string 
  public  BII_RECEIPTDATELOCK: string 
  public  CASE_FOR_LR_SAME_CONSINEE: string 
  public  CFT_BASE_FT_OR_INCH: string 
  public  CHARGEDWT_COND_CHK: string 
  public  CHK_PARTY_CREDITPERIOD: string 
  public  CLEAR_LR_PARTY_FLDS: string 
  public  CNTR_TOBRANCH: string 
  public  CONSGMT_CONTRACT_UNITWISE: string 
  public  CONTRACTRATECOMPARE: string 
  public  DEFAULT_CONTRACT_CHRGE: string
  public DELATDISABLED: string 
  public  E_WAY_BILL: string 
  public  FOV_BRANCH: string 
  public  FOV_VALUE: string 
  public  GC_PAYABLE_BY_COND: string 
  public  GCPAYABLEBYENABLE: string 
  public  GCPAYABLECOND: string 
  public  GST_EFFECTIVE_DATE: string 
  public  HIDETBBRATEFROMLR: string
  public  INV_NO_CMP: string 
  public  INV_VALUE_CMP: string 
  public  INVVALUE_COND_CHK: string 
  public  IS_DATA_ACCESS_APPL: string
  public  ISROUTECOMP: string 
  public  JUMPING_LR: string
  public  JWFBUSACCSTATE: string 
  public  JWFCANCELGCENTRYENABLED: string 
  public  JWFLRPAGETYPE: string 
  public  JWFLRSAVEQUEUE: string
  public  JWFLRDTLSCUSTOMCHIRAG: string 
  public  JWFLRDTLSCUSTOMITEMDESC: string 
  public  JWFLRDTLSCUSTOMONKAR: string
  public JWFMANUALPINCODE: string 
  public JWFODCBRANCH: string 
  public  JWFSERVERDATE: string 
  public  JWFSHOWPARKEDVEHICLES: string 
  public  JWFUSERACCESSCLASS: string 
  public  JWFWALKINCUSTOMER: string 
  public  JWF_FML: string 
  public JWF_LR_API_INTEGRATION_ENABLE: string 
  public  JWF_LR_POST_SAVE_EDIT: string 
  public  JWF_PRINT_URL: string 
  public  LR_CC_ATTACH: string 
  public  LR_CFT_DEFAULT_VALUE: string 
  public LR_FOV_SELF_VALUE: string
  public  LR_FOV_TRANSPORTER_VALUE: string
  public  LR_INVNO_DUPLICATE: string 
  public  LR_INVNO_LENGTH: string
  public  LR_INVNO_VAL: string 
  public  LR_SELF: string
  public  LR_SP: string 
  public LRCHARGESAMOUNT: string 
  public  LRUPDATE: string 
  public  MALL: string
  public  MANUALLY_DEL_AT: string 
  public  MAX_ITEM_IN_LR: string 
  public  MAX_SEARCH_PAGE_ROWS: string 
  public  MENUXML: string
  public  MODERNTRADE: string 
  public ODASALESCONTRACTKMWISE: string
  public ODC_BRANCH: string
  public PAIDLRSERTAXFORBATCO: string 
  public  PARTYCONTRACTUNIT: string 
  public  PARTYWISE: string 
  public  PREVENTnumberPRINT: string 
  public  REMOVEPOSTBACK: string 
  public  REVERSECOLLDEL: string 
  public  SALE_FREIGHT_0_APPLICABLE: string 
  public  SALECNTRODA: string 
  public  SCHEDULEDDATELOG: string
  public  SERIES_LENGTH: string 
  public  SERVICE_TAX: string 
  public  SHEDULE_DATE_MASTERWISE: string 
  public  TBBHIDE_COND_CHK: string 
  public  TOLERANCE: string
  public  TOLERANCE_ENABLE: string
  public  PrintURL: string 
}
// getChargeTemplate
export class ChargeTemplate {
    
  public  ChargeCode: string 
  public  Formula: string 
  public  EntryType: string 
  public  RoundingType: string 
}
// getWeightMasterData
export class WeightMasterData {
  public  Weight: number 
  public  FactorKey: string 
}

