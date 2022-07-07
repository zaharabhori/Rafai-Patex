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
  data:any;
  login:Login;
  EmpLoginForm: FormGroup;
  Mobile: string;
  Password: string;
  submitted: boolean = false;
  baseurl = environment.devUrl;

  collapsed = true;

  constructor(private fb: FormBuilder, private myRouter: Router,private api: ApiService,private httpClient: HttpClient, private router:Router ) { }

  ngOnInit(): void {
    this.EmpLoginForm = this.fb.group({
      Mobile: ['', [Validators.required, Validators.maxLength(10)]],
      Password: ['', [Validators.required]]
    });
    localStorage.clear();
  }
  get f() {
    return this.EmpLoginForm.controls;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }


  ///  Used for Login User
  submitForm(): Observable<any> {
    this.submitted = true;
    if (this.EmpLoginForm.invalid) {
      return;
    }


   
    this.login=this.EmpLoginForm.value;
    console.log(this.EmpLoginForm.value);
    
    
    // this.api.Getlogindata(this.login)
    // .subscribe(data => {
    //   console.log(data)
    // })    

     // this.myRouter.navigateByUrl('/shipment home');
    
    this.api.Getlogindata(this.login).subscribe(
      (resp: any) => {
        console.log(resp);
        debugger
          if(resp.Password===this.EmpLoginForm.controls.Password.value)
          {
          localStorage.setItem('UserName', this.EmpLoginForm.controls.Mobile.value);
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
//   checkByCredential(username: string, password: string) 
//  {
//    this.MyService.checkByCredential(username, password)
//       .subscribe(users => {
//            if(users)
//               this.router.navigate(['homepage/home']);
//            else
//               this.router.navigate(['homepage']); 
//            }   );
//                 }}
}
