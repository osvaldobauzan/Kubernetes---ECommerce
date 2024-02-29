import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  shouldShowFooter(): boolean {
    // Verificar si la ruta actual es igual a "/signin"
    // return this.router.url !== '/signin';
    return !['/signin', '/signup'].includes(this.router.url);
  }
  
}
