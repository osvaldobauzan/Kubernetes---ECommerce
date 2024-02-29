import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  validUser:boolean = false

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }


  ngOnInit(): void {
    // if ( this.checkUserSession() )
    //   console.log("Hola Caracola")
    // else
    //   console.log("Mal no hay loggedin")
  }

  // checkUserSession():boolean{
  //   return this.authService.getLoggedIn();
  // }
  
  shouldShowHeader(): boolean {
    // Verificar si la ruta actual es igual a "/signin"
    // return this.router.url !== '/signin';
    return !['/signin', '/signup'].includes(this.router.url);
  }

  existsToken(): boolean {
    // return !!localStorage.getItem('token');
    return this.authService.existsToken();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/index']);
  }

}
