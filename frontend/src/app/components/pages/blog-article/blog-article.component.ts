import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XutilitiesService } from '../../../services/xutilities.service';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [

  ],
  providers: [
    XutilitiesService
  ],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.css'
})
export class BlogArticleComponent implements OnInit{

  articleId = '';
  article:any = {};

  constructor (
    private xutilitiesService:XutilitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    // Obtener id del url
    this.route.params.subscribe(
      params => {
        this.articleId = params['id'];
      }
    )
    this.xutilitiesService.getArticleById(this.articleId)
        .subscribe(
          res => {
            // console.log(res)
            this.article = res;
          },
          err => {
            console.log(err)
          }
        )
  }

}
