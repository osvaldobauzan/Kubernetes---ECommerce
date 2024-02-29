import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductReviewComponent } from '../../partials/product-review/product-review.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-shop-product',
  standalone: true,
  imports: [
    ProductReviewComponent,
    CommonModule,
    FormsModule,
  ],
  providers : [
    ProductService,
    ShopService,
    AuthService,
  ],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.css'
})
export class ShopProductComponent implements OnInit{
  
  product:any = {}
  productId: string | null = null;
  item: any = {};
  
  operator:any = "plus";

  message: string | null = null; //nuevo

  constructor (
    private productService:ProductService,
    private shopService: ShopService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(
      params => {
        this.productId = params['id'];
      }
    )
    this.productService.getProductsbyId(this.productId)
        .subscribe(
          res => {
            this.product = res;
          },
          err => {
            console.log(err)
          }
        )

    let token = ''
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token') || '';
      if ( token.length > 0 && token !== null){
        // console.log("tok tok", token);
        this.item.userId = (JSON.parse(atob(token.split('.')[1]))).id;
      }
    }
    this.item.quantity = 0;
  }

  addItem () {


        // const statusOrder = "Cart";
        // const operation = req.body.operation;
        // delete req.body.operation
        // const userId = req.body.userId;
        // const orderId = req.body.orderId;
        // const productId = req.body.productId;
        // const unitPrice = req.body.unitPrice;
        // const quantity = req.body.quantity;
        // const subTotal = unitPrice * quantity;

    if (!this.authService.existsToken()) {
      this.message="Inicie sesión para empezar a comprar";
          setTimeout(() => {
            this.message = null;
            }, 1500);
    }
    else 
    {
      if (this.item.quantity === 0){
        this.message="La cantidad no puede ser cero, por favor, indique una cantidad";
          setTimeout(() => {
            this.message = null;
            }, 2000);
      }
      else {
        this.item.productId = this.productId;
        this.item.productName = this.product.name;
        this.item.productImage = this.product.image[0];
        this.item.unitPrice = this.product.price;
        this.item.size = this.product.size;
        this.item.subTotal = this.item.unitPrice * this.item.quantity;
        this.item.operation = this.operator;
        // console.log('IT EM',this.item)
        this.shopService.addItem(this.item)
        .subscribe(
          res => {
            console.log(res)
            this.message="Producto añadido a la cesta";
            setTimeout(() => {
              this.message = null;
              }, 1500);
            // this.router.navigate(['profile']);
          },
          err => {
            console.log(err)
          } 
        )
      }

      
    }
    
  }

  decreaseQuantity() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }
  
  increaseQuantity() {
    this.item.quantity++;
  }

}
