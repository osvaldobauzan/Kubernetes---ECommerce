import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor(private userService: UserService){}

  user:any = {} || null;
  passwordsNotMatch: boolean = false;
  submitted: boolean = false;
  message:any = null;

  changePassword(){

    this.submitted = true;
    if (!this.user.password ) {
      return; 
    }

    if (this.user.password !== this.user.password2) {
      this.passwordsNotMatch = true;
      return; 
    }

    this.userService.updatePassword(this.user)
        .subscribe(
          res => {
            this.message = "Contraseña modificada."
          },
          err => {
            console.log(err)
          }

        );

  }

  
}
