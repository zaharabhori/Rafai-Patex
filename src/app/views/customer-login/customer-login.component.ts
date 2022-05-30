import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;
  Mobile: string;
  submitted: boolean = false;
  _login: Login;
  otpDiv = false;
  otp: number = 0;
  collapsed = true;

  constructor(private fb: FormBuilder, private myRouter: Router,private api: ApiService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      Mobile: ['', [Validators.required, Validators.maxLength(10)]],
    });
    this.otpForm = this.fb.group({
      otpInput: ['', [Validators.required]],
    });
    localStorage.clear();
  }
  get f() {
    return this.loginForm.controls;
  }

  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  ///  Used for Login User
  submitForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let otp= this.generateOTP();
    this._login = new Login();
    this._login.Mobile=this.loginForm.controls.Mobile.value;
    this._login.OTP=otp;
    console.log(otp);
    localStorage.setItem('MobileOtp', otp);
    localStorage.setItem('Mobile', this.loginForm.controls.Mobile.value);
    this.api.ValidateOTP(this._login).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (err) => {
        alert('Server Error !!');
      }
    );
  
    this.otpDiv = true;
  }
  generateOTP() { 
    
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
   }

   submitOtpForm(){
    this.submitted = true;
    this._login = new Login();
    this._login.Mobile=localStorage.getItem('Mobile');
    this._login.OTP=localStorage.getItem('MobileOtp');
    
   if(this.otp==Number(this._login.OTP))
  {
     this.api.CheckUserExists(this._login).subscribe(
       (resp: any) => {
        console.log(resp);
       if (resp.Message=="Mobile no does not exist")
       {
        this.myRouter.navigateByUrl('/signin');
       }
       else
       {
        this.myRouter.navigateByUrl('/booking');
       }
     },
    (err) => {
      alert('Server Error !!');
      }
     );
  }
  else
  {
    alert('Invalid OTP !!');
  }
  } 

  onOtpChange(otp){
    this.otp = otp;
  }
     
}
