import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class XutilitiesService {

  private URL = 'http://35.208.97.0:32704'
  // private URL ='http://localhost:8004'
  // private URL ='http://xutilities.default.svc.cluster.local:8004'
  
  token:any ="";
  headers:any;

  constructor(
    private http: HttpClient
  ) { 

    this.setHeader();
  }

  /**
   * Common Method
   */
  setHeader(){

    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      });
      // console.log("ShopService constructor - token ok", this.token)
    } else {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer `,
      });
      // console.log("ShopService constructor - localStorage undefined")
    }
  }

  /**
   * Articles
   */
  getArticles(){
    return this.http.get<any>(this.URL + `/articles`);
  }

  getArticleById(id:any){
    return this.http.get<any>(this.URL + `/articles/${id}`);
  }

  /**
   * Cities
   */

  getCommunities(){
    return this.http.get<any>(this.URL + `/communities`)
  }
  /**
   * Brand
   */
  getBrands () {
    return this.http.get<any>(this.URL + `/brands`)
  }

  /**
   * Reviews
   */

  getReviewsByProduct(productId:any){
    return this.http.get<any>(this.URL + `/reviews/product/${productId}`);
  }

  // createReview(productId:any, newReview:any){
  //   return this.http.post<any>(this.URL + `/reviews/product/${productId}`, newReview);
  // }
  createReview(productId:any, newReview:any){
    // console.log("KKKKKKKKKKK", productId)
    // console.log("KKKKKKKKKKK", newReview)
    return this.http.post<any>(this.URL + `/reviews/product/${productId}`, newReview);
  }

  getReviewsByUser(){
    return this.http.get<any>(this.URL + `/reviews/user`,  {headers: this.headers})
  }

  /**
   * Category
   */
  getCategory () {
    
  }
}
