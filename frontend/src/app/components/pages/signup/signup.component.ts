import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { XutilitiesService } from '../../../services/xutilities.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    // BrowserModule,
    // HttpClientModule,
    
  ],
  providers: [
    AuthService,
    XutilitiesService,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  // user ={
  //   email: '',
  //   password: '',
  // }
  passwordsNotMatch: boolean = false;
  submitted: boolean = false;

  user:any = {} || null;
  communities:any = [];

  constructor(
    private authService: AuthService,
    private xutilitiesService: XutilitiesService,
    private router: Router) {

  }
  ngOnInit() {
    this.getCommunities();
  }

  signup(){

    this.submitted = true;

    if (!this.user.name || !this.user.lastname || !this.user.phone || !this.user.community || !this.user.email || !this.user.password ) {
      return; // No enviar el formulario si algún campo requerido está vacío
    }

    if (this.user.password !== this.user.password2) {
      this.passwordsNotMatch = true; // Mostrar el mensaje de error si las contraseñas no coinciden
      return; // Evita enviar el formulario si las contraseñas no coinciden
    }

    return this.authService.signup(this.user)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/index'])
      },
      err => {
        console.log('Error Autenticación',err)
      }
    )
  }

  getCommunities() {
    this.xutilitiesService.getCommunities()
      .subscribe(
        res => {
          this.communities = res.communities;
        },
        err => {
          console.log("Err ProfileComponent", err)
        }
      )
  }
}
