export class Login{
    Username:string;
    Password:string;
    Mobile:string;
    Id:number;
    OTP:string;
  }

  export class CustomerLogin{
      rowid:number;
      FirstName:string;
      LastName:string;
      Email: string;
      Gender: number;
  }

  export class CustomerArea{
    public  Row_id :number
        public  Pincode :string
        public  District :string
        public  City :string
        public  State :string
        public  Country :string
}