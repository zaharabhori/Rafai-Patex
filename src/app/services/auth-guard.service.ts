import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private myRoute: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   const UserName = localStorage.getItem('UserName');
   const mobile =localStorage.getItem('Mobile');
    if (UserName!= null || UserName!= undefined) {
      return true;
    } 
    else if (mobile!= null || mobile!= undefined) {
      return true;
    } 
    else {
      this.myRoute.navigateByUrl('/login');
      return false;
    }
  }
}
