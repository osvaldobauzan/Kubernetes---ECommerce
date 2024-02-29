import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://35.208.97.0:32701'
  // private URL = 'http://localhost:8001'
    
  constructor(private http: HttpClient) { 

  }

  createProduct(product:any) {
    console.log('serviceprod', product)
    return this.http.post<any>(this.URL, product);
  }

  getProducts(){
    return this.http.get<any>(this.URL);
  }

  getProductsByCategory(category:any){
    return this.http.get<any>(this.URL + `/category/${category}`);
  }

  getBrands(){
    return this.http.get<any>(this.URL + '/brands');
  }

  getProductsbyId(id: any){
    // console.log("product.service.ts - getProductsbyId")
    const urlnew = this.URL + `/${id}`
    // console.log("product.service.ts", urlnew)
    return this.http.get<any>(urlnew);
  }

  getProductsByName(text:any){
    return this.http.get<any>(this.URL + `/search/${text}`);
  }

}
