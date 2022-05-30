import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName = 'Admin';
  Customer = 'Admin';
  userId:any;  
  collapsed = true;

  constructor( private router: Router,private api: ApiService) { }

  ngOnInit(): void {
    this.UserName =localStorage.getItem('UserName');
    this.userId = localStorage.getItem('UserID');
    this.Customer =localStorage.getItem('Mobile');
    
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  
  logout() {
    this.api.logout();
  }
}
