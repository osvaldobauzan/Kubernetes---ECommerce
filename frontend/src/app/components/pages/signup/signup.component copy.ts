import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    // HttpClientModule,
    
  ],
  providers: [
    AuthService,
    
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  // user ={
  //   email: '',
  //   password: '',
  // }
  user:any = {} || null;

  constructor(
    private authService: AuthService,
    private router: Router) {

  }
  ngOnInit() {

  }

  signup(){
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
}
