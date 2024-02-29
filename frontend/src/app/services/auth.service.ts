import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://35.208.97.0:32702'
  // private URL ='http://localhost:8002'
  // private URL ='http://user.default.svc.cluster.local:8002'
  token:any ="";
  headers:any;

  constructor(private http: HttpClient) {

   }

  //  getLoggedIn(){
  //   // MEJORA: Hay que validar que el token sea válido.
  //   if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== '') 
  //     return true;

  //   return false;
  //  }

   signup(user:any) {
    return this.http.post<any>(this.URL, user);
   }

   signin(user: any) {
    console.log(user)
    return this.http.post<any>(this.URL + '/login', user);
   }

   getToken () {
    return localStorage.getItem('token');
   }

   existsToken(): boolean {
    return typeof localStorage !== 'undefined' && localStorage !== null && !!localStorage.getItem('token');
    // return !!localStorage.getItem('token');
   }

   logout():void  {
    localStorage.removeItem('token');
   }
}
