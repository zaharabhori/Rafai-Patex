import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/Models/Login';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  login:Login;
  loginForm: FormGroup;
  Mobile: string;
  Password: string;
  submitted: boolean = false;
  baseurl = environment.devUrl;
  constructor(private fb: FormBuilder, private myRouter: Router,private api: ApiService,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Mobile: ['', [Validators.required, Validators.maxLength(10)]],
      Password: ['', [Validators.required]]
    });
    localStorage.clear();
  }
  get f() {
    return this.loginForm.controls;
  }
  ///  Used for Login User
  submitForm(): Observable<any> {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
   
    this.login=this.loginForm.value;
    console.log(this.loginForm.value);
    
    
    // this.api.Getlogindata(this.login)
    // .subscribe(data => {
    //   console.log(data)
    // })    

     // this.myRouter.navigateByUrl('/shipment home');
    
    this.api.Getlogindata(this.login).subscribe(
      (resp: any) => {
        console.log(resp);
        debugger
          if(resp.Password===this.loginForm.controls.Password.value)
          {
          localStorage.setItem('UserName', this.loginForm.controls.Mobile.value);
          localStorage.user = JSON.stringify(resp);
          localStorage.setItem('UserID',resp.Id)
          this.myRouter.navigateByUrl('/shipment');
          }
           else{
            alert('Unauthorized User !! Please contant admin.');
          }

      },
      (err) => {
        alert('Server Error !!');
      }
    );
  }
  
  
}
