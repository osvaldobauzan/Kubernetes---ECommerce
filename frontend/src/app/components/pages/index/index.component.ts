import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { XutilitiesService } from '../../../services/xutilities.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    XutilitiesService,
    ProductService,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  articles: any = []
  // Inicio variables Paginación
  pageSize = 2;
  pages: number = 0;
  from: number = 0;
  to: number = this.pageSize;

  searchText:string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private xutilitiesService: XutilitiesService,
    private productService: ProductService,
    private paginator: MatPaginatorIntl
  ) { }

  ngOnInit(): void {

    this.xutilitiesService.getArticles()
    .subscribe(
      res => {
        // console.log("blog.component.ts", res.articles[0]);
        this.articles = res.articles;
        //Paginación
        this.pages = this.articles.length;
        this.paginator.itemsPerPageLabel = 'Artículos por página:';
      },
      err => {
        console.log("Error ngOnInit index.component", err)

      }
    )

    // INIT SCROLL

    if (isPlatformBrowser(this.platformId)) {

      window.addEventListener('scroll', function () {
        // console.log("============================= addEventListener OnInit indexComponent ===============================");
        var welcomeText = document.getElementById('welcomeText');
        var header = document.querySelector('.header');
        if (header && welcomeText) {
          if (window.scrollY > 50) {
            header.classList.add('hide');
            welcomeText.style.visibility = 'hidden';
          } else {
            header.classList.remove('hide');
            welcomeText.style.visibility = 'visible';
          }
        }
  
      }, { passive: true });

    }
    

    // FIN SCROLL

  }

  changePage(e: PageEvent) {
    // console.log(e);
    this.from = e.pageIndex * this.pageSize;
    this.to = this.from + e.pageSize;
  }


  searchProducts(){
    this.router.navigate(['perfumes', 'search', this.searchText.trim()]); // Navegar a la ruta 'perfumes/search/:searchText'

    // this.productService.getProductsByName(this.searchText)
    //   .subscribe(
    //     res => {
    //       console.log(res)
    //       this.router.navigate(['perfumes', 'search', this.searchText.trim()]); // Navegar a la ruta 'perfumes/search/:searchText'
    //     },
    //     err => {
    //       console.log("ERR - Searching products", err)
    //     } 
    //   )
  }

}
