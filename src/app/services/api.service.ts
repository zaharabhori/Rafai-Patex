import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerLogin, Login } from '../Models/Login';
import { Observable } from 'rxjs';
import { ShipmentQue } from '../Models/ShipmentQue';
import { Router } from '@angular/router';
import { apiDataInWrap } from '../Models/ClientSessionInfo';
function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  token: any;
  baseurl: string;
  get nativeWindow(): any {
    return _window();
  };
  
  
  constructor(private httpClient: HttpClient,private myRouter: Router) {
    this.baseurl = environment.devUrl;
    
   // this.token = sessionStorage.getItem('token');
  }
  // PostApi(requestBody: any) {
  //   return this.httpClient.post(`${this.baseurl}`, requestBody);
  // }
  PostApiLogin(user: any, val: string) {
    return this.httpClient.post(`${this.baseurl}` + val, user);
  }
  // GetApi(requestBody: any) {
  //   return this.httpClient.get(`${this.baseurl}`, requestBody );
  // }

  GetSeedData(oInput: apiDataInWrap): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(oInput);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/Main" , body,{'headers':headers})
  }
  SaveData(oInput: apiDataInWrap): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(oInput);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/Main" , body,{'headers':headers})
  }
  UploadFile(image: File): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
   const formData = new FormData();
   
   formData.append('image', image);
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/UploadFiles" , formData,{'headers':headers})
  }

  SavePaymentResponse(oInput: apiDataInWrap): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(oInput);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/SavePaymentResponse" , body,{'headers':headers})
  }


  GetBookingLocationLookupData(oInput: apiDataInWrap): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(oInput);
   // console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/CustomerBookingLocation" , body,{'headers':headers})
  }

  GetApi(requestBody: any, val: string) {
    console.log(requestBody);
    return this.httpClient.get(`${this.baseurl}` + val, requestBody);
  }


  CustomerSignin(Customerlogin:CustomerLogin): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Customerlogin);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/CustomerSignin", body,{'headers':headers})
  }
  CheckUserExists(login:Login): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(login);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/CheckUserExists", body,{'headers':headers})
  }

  ValidateOTP(login:Login): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(login);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/CustomerLogin", body,{'headers':headers})
  }

  GetCustomerPersonalDetails(login:Login): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(login);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/CustomerPersonalDetails", body,{'headers':headers})
  }

  Getlogindata(login:Login): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(login);
    console.log(body)
    return this.httpClient.post(this.baseurl + 'GetUserPassword', body,{'headers':headers})
  }

  GetShipmentdata(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.get(this.baseurl + 'GetShipmentQue', {'headers':headers})
  }

  GetCustomerQue(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/GetCustomerQue" , body,{'headers':headers})
  }
  PickupComplite(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/PickupComplite" , body,{'headers':headers})
  }
  GetMyQue(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/GetMyQue" , body,{'headers':headers})
  }
  Get_Unload_Que(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/GetUnloadQue" , body,{'headers':headers})
  }
  GetBranchList(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Customer/GetBranch" , {'headers':headers})
  }

  GetUnloadlist(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
    console.log(body)
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Jwf/GetUnloadQue" , body,{'headers':headers})
  }
  logout() {
    localStorage.clear();
    this.myRouter.navigateByUrl('/login');
  }
  TrackShipment(shipmentque:ShipmentQue): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(shipmentque);
 
    return this.httpClient.post("http://95.217.73.20:2121/PatexWebApi/api/Jwf/TrackShipment" , body,{'headers':headers})
  }
}
