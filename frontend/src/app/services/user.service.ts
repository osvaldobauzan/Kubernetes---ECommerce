import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://35.208.97.0:32702'
  // private URL ='http://localhost:8002'
  // private URL ='http://user.default.svc.cluster.local:8002'
  

  token:any ="";
  headers:any;

  constructor(
    private http: HttpClient
  ) 
  { 
    this.setHeader();
  }

  setHeader(){
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      });
      // console.log("UserService constructor - token ok", this.token)
    } else {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer `,
      });
      // console.log("UserService constructor - localStorage undefined")
    }
  }

  getUserById(){
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    // });

    return this.http.get<any>(this.URL + `/profile`, { headers: this.headers });
  }

  updateProfile (user: any) {
    /**
     * Revisar, porque tenemos que enviar el token y el body.
     * updateProfile -> Recibe todo el usuario y su token.
     */

    // console.log('USERSERVICE', user)
    return this.http.put<any>(this.URL + `/updateProfile`, user, {headers: this.headers})
  }

  updatePassword(user:any){
    return this.http.put<any>(this.URL + `/updatePassword`, user, {headers: this.headers})
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {
//   private userProfile: any = {
//     name: 'Juan Pérez',
//     email: 'juan@example.com',
//     address: 'Calle Principal, Ciudad, País',
//     phone: '+123456789',
//     avatar: 'avatar.jpg' // Puedes guardar la ruta de la imagen del avatar aquí
//   };

//   constructor() { }

//   getUserProfile() {
//     return this.userProfile;
//   }
// }
