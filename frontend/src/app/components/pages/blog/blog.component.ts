import { Component, OnInit } from '@angular/core';
import { XutilitiesService } from '../../../services/xutilities.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatList,
    MatListItem,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    XutilitiesService
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  articles = []
  // Inicio variables Paginación
  pageSize = 2;
  pages:number = 0;
  from:number = 0;
  to:number = this.pageSize;
  constructor(
    private router: Router,
    private xutilitiesService: XutilitiesService,
    private paginator: MatPaginatorIntl
  ) {}

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

        }
      )
  }

  changePage (e: PageEvent){
    // console.log(e);
    this.from = e.pageIndex * this.pageSize;
    this.to = this.from + e.pageSize;
  }

}
