import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../services/user.service';
import { XutilitiesService } from '../../../services/xutilities.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // ShopComponent,
  ],
  providers : [
    ShopService,
    UserService,
    XutilitiesService,
    AuthService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  existToken:boolean = false;

  userId:string | null = null;
  user:any = {};
  order:any = {};
  orderId:string | null = null;
  items:any = []
  communities:any = []

  address: any = {};
  token:any ="";
  // headers:any;
  paymentEnabled: boolean = false;


  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private authService: AuthService,
    private xutilitiesService: XutilitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.paymentEnabled = false;

    this.getCommunities();

    this.existToken = this.checkExistToken2();

    if (this.existToken){
      console.log("IFFFF", this.existToken)
      
    }
      
  }

//   async ngOnInit(): Promise<void> {
//     try {
//         const cartResponse: any = await this.shopService.getCart().toPromise();
//         console.log("Respuesta de getCart:", cartResponse);
//         this.order = cartResponse;

//         // Llamada a getItemsByOrder solo si hay un pedido válido
//         if (this.order && this.order.id) {
//             const itemsResponse: any = await this.shopService.getItemsByOrder(this.order.id).toPromise();
//             console.log("Respuesta de getItemsByOrder:", itemsResponse);
//             this.items = itemsResponse;
//         }
//     } catch (error) {
//         console.error("Error al obtener el carrito o los elementos del pedido:", error);
//     }
// }

  updateQuantity(productId:any, quantity:any, price:any, operator:any){
      let itemMod:any = {};

      itemMod.userId = this.user.id
      itemMod.productId = productId;
      itemMod.unitPrice = price;
      itemMod.quantity = 1
      itemMod.operation = operator;
      console.log("itemmod", itemMod)
      this.shopService.addItem(itemMod)
      .subscribe(
        res => {
          console.log(res)
          window.location.reload()
          // this.router.navigate(['profile']);
        },
        err => {
          console.log(err)
        } 
      )
    
  }

  updateAddress(){
    let update:any = {};

    update.orderId = this.order.id;
    update.address = this.order.address ?? this.user.address;
    update.community = this.order.community ?? this.user.community;
    update.postalCode = this.order.postalCode ?? this.user.postalCode;

    console.log("update", update)
    this.shopService.updateOrder(update)
        .subscribe(
          res => {
            console.log("Update Address:::> ", res);
            this.paymentEnabled = true;
          },
          err => {
            console.log(err)
          }
        )

  }


  eliminarItem(itemId:any){
    this.shopService.deleteItem(itemId)
        .subscribe(
          res => {
            console.log("res:::> ", res);

            
          },
          err => {
            console.log(err)
          }
        )
  }

  /** OTROS **/

  checkExistToken2(){

    if ( !this.authService.existsToken() ) {
      this.router.navigate(['signin']);
      return false;
    } else {
      this.userService.getUserById()
        .subscribe(
          res => {
            console.log("noOnInitgetUserById:::> ", res);
            this.user = res;
            this.shopService.getCart()
                  .subscribe(
                    res => {
                      console.log("res:::> ", res);
                      this.order = res;
                      this.orderId = this.order.id;
                      this.shopService.getItemsByOrder(this.order.id)
                          .subscribe(
                            res => {
                              console.log("resITEM:::> ", res);
                              this.items = res;
                              
                            },
                            err => {
                              console.log(err)
                            }
                          )
                    },
                    err => {
                      console.log(err)
                    }
                  )
            return true;
          },
          err => {
            this.router.navigate(['signin']);
            console.log(err);
            return false;
          }
        );
    }
    
    return false;
  


  }
  


  checkExistToken(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      console.log("CartComponent ngOnInit - token ok", this.token);
      this.userService.getUserById()
        .subscribe(
          res => {
            console.log("noOnInitgetUserById:::> ", res);
            this.user = res;
          },
          err => {
            this.router.navigate(['signin']);
            console.log(err)
          }
        )
      
    } else {
      console.log("CartComponent ngOnInit - token nook - redirection signin", this.token);
      this.router.navigate(['signin']);
    }
  }
  
  getCommunities() {
    this.xutilitiesService.getCommunities()
        .subscribe(
          res => {
            console.log('---------->',res)
            this.communities = res.communities;
          },
          err => {
            console.log("Err ProfileComponent", err)
          }
    )
  }
}
