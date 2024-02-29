import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

/**
 * Reference: 
 * https://www.youtube.com/watch?v=oO_7n6q5OEU
 * https://collinskipkemoi.medium.com/adding-mat-paginator-to-html-list-or-mat-list-a9626e114048
 * 
 */

@Component({
  selector: 'app-perfumes',
  standalone: true,
  imports: [
    AppComponent,
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatList,
    MatListItem,
    RouterModule,
  ],
  providers: [
    ProductService,
  ],
  templateUrl: './perfumes.component.html',
  styleUrl: './perfumes.component.css'
})
export class PerfumesComponent implements OnInit {

  products = [];
  category: any = "";
  // Inicio variables Paginación
  pageSize = 3;
  pages: number = 0;
  from: number = 0;
  to: number = this.pageSize;
  // Fin Paginación
  constructor(
    private productService: ProductService,
    private paginator: MatPaginatorIntl,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.category = "";
    this.route.params.subscribe(params => {
        this.category = params['category'];
        console.log("::::::::::> ", typeof this.category)

      this.getProducts(this.category);
      });
  }

  getProducts(category: any) {
    if (typeof category !== 'undefined' && category !== '' ) {
      this.productService.getProductsByCategory(category)
        .subscribe(
          res => {
            // console.log(res)
            this.products = res;
            //Paginación
            this.pages = this.products.length;
            this.paginator.itemsPerPageLabel = 'Productos por página:';
          },
          err => {
            console.log(err)
          }
        )
    } else {
      this.productService.getProducts()
        .subscribe(
          res => {
            // console.log(res)
            this.products = res;
            //Paginación
            this.pages = this.products.length;
            this.paginator.itemsPerPageLabel = 'Productos por página:';
          },
          err => {
            console.log(err)
          }
        )
    }
  }

  redirectToProduct(productId: number) {
    this.router.navigate(['/shop-product', productId]);
    // this.router.navigate(['/shop-product']);
  }

  changePage(e: PageEvent) {
    // console.log(e);
    this.from = e.pageIndex * this.pageSize;
    this.to = this.from + e.pageSize;
  }
}