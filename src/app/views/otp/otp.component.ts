import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  OTPForm: FormGroup;
  OTP: string;
  submitted: boolean = false;
  login: Login;
  constructor(private fb: FormBuilder, private myRouter: Router,private api: ApiService) { }

  ngOnInit(): void {
    this.OTPForm = this.fb.group({
      OTP: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }
  get o() {
    return this.OTPForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.OTPForm.invalid) {
      return;
    }
    this.login = new Login();
    this.login.Mobile=localStorage.getItem('Mobile');
    this.login.OTP=localStorage.getItem('MobileOtp');
    
   if(this.OTPForm.controls.OTP.value==this.login.OTP)
  {
     this.api.CheckUserExists(this.login).subscribe(
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
}
