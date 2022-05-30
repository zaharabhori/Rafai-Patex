import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerLogin } from 'src/app/Models/Login';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-sign-in',
  templateUrl: './customer-sign-in.component.html',
  styleUrls: ['./customer-sign-in.component.css']
})
export class CustomerSignInComponent implements OnInit {
  addUser: FormGroup;
  Customerlogin: CustomerLogin;
  constructor(private fb: FormBuilder, private myRouter: Router,private api: ApiService) { }

  ngOnInit(): void {
    this.addUser = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: [''],
      Email: ['', Validators.required],
      Mobile: [null, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      Gender: ['', Validators.required],
    
    });
   
  }
  get f() {
    return this.addUser.controls;
  }
  Save():void {
    console.log(this.addUser.value);
    this.Customerlogin=this.addUser.value;
    this.api.CustomerSignin(this.Customerlogin).subscribe(
      (resp: any) => {
        console.log(resp);
        localStorage.setItem('User', JSON.stringify(this.Customerlogin));
   
        this.myRouter.navigateByUrl('/booking');
      },
      (err) => {
        alert('Server Error !!');
      }
    );
   
  }
}
