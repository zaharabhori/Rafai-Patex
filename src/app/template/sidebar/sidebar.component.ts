import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  UserName = localStorage.getItem('UserName');
 
  collapsed = true;
  constructor(public router: Router) { }

  ngOnInit(): void {
    //console.log(this.UserName)
  }

}
