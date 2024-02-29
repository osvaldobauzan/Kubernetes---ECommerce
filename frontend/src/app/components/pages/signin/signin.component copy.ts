import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  providers: [
    AuthService,

  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  user ={
    email: '',
    password: ''
  }

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  signin(){
    this.authService.signin(this.user)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          this.router.navigate(['profile']);
        },
        err => {
          console.log(err)
        } 
      )
  }

}
