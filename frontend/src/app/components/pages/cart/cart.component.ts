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
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    // ShopComponent,
  ],
  providers: [
    ShopService,
    UserService,
    XutilitiesService,
    AuthService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  //Payment disabled:
  contentBlocked: boolean = true;
  //Message
  message: string | null = null; //nuevo


  existToken: boolean = false;

  userId: string | null = null;
  user: any = {};
  order: any = {};
  orderId: string | null = null;
  items: any = []
  communities: any = []

  address: any = {};
  token: any = "";
  // headers:any;
  paymentEnabled: boolean = false;

  updatePay: any = {}


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

    if (this.existToken) {
      console.log("IFFFF", this.existToken)
    }

  }

  updateQuantity(productId: any, quantity: any, price: any, operator: any) {
    let itemMod: any = {};

    itemMod.userId = this.user.id
    itemMod.productId = productId;
    itemMod.unitPrice = price;
    itemMod.quantity = 1
    itemMod.operation = operator;
    this.shopService.addItem(itemMod)
      .subscribe(
        res => {
          this.shopService.getCart()
            .subscribe(
              res => {
                this.order = res;
                this.orderId = this.order.id;
                this.shopService.getItemsByOrder(this.order.id)
                  .subscribe(
                    res => {
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
          // window.location.reload()
          // this.router.navigate(['profile']);
        },
        err => {
          console.log(err)
        }
      )

  }

  updateAddress() {
    let update: any = {};

    update.orderId = this.order.id;
    update.address = this.order.address ?? this.user.address;
    update.community = this.order.community ?? this.user.community;
    update.postalCode = this.order.postalCode ?? this.user.postalCode;

    // console.log("update", update)
    this.shopService.updateOrder(update)
      .subscribe(
        res => {
          // console.log("Update Address:::> ", res);
          this.paymentEnabled = true;
          this.contentBlocked= false;
        },
        err => {
          console.log(err)
        }
      )

  }


  eliminarItem(itemId: any) {
    this.shopService.deleteItem(itemId)
      .subscribe(
        res => {
          // console.log("res:::> ", res);
          this.shopService.getCart()
            .subscribe(
              res => {
                // console.log("res:::> ", res);
                this.order = res;
                this.orderId = this.order.id;
                this.shopService.getItemsByOrder(this.order.id)
                  .subscribe(
                    res => {
                      // console.log("resITEM:::> ", res);
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
        },
        err => {
          console.log(err)
        }
      )
  }

  /** OTROS **/

  checkExistToken2() {

    if (!this.authService.existsToken()) {
      this.router.navigate(['signin']);
      return false;
    } else {
      this.userService.getUserById()
        .subscribe(
          res => {
            // console.log("noOnInitgetUserById:::> ", res);
            this.user = res;
            this.shopService.getCart()
              .subscribe(
                res => {
                  // console.log("res:::> ", res);
                  this.order = res;
                  this.orderId = this.order.id;
                  this.shopService.getItemsByOrder(this.order.id)
                    .subscribe(
                      res => {
                        // console.log("resITEM:::> ", res);
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



  checkExistToken() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      // console.log("CartComponent ngOnInit - token ok", this.token);
      this.userService.getUserById()
        .subscribe(
          res => {
            // console.log("noOnInitgetUserById:::> ", res);
            this.user = res;
          },
          err => {
            this.router.navigate(['signin']);
            console.log(err)
          }
        )

    } else {
      // console.log("CartComponent ngOnInit - token nook - redirection signin", this.token);
      this.router.navigate(['signin']);
    }
  }

  getCommunities() {
    this.xutilitiesService.getCommunities()
      .subscribe(
        res => {
          // console.log('---------->', res)
          this.communities = res.communities;
        },
        err => {
          console.log(err)
        }
      )
  }

  updateOrderPayment() {
    this.updatePay.orderId = this.orderId
    // console.log('updateOrderPayment', this.updatePay)

    
 


    this.shopService.updateOrderPayment(this.updatePay)
      .subscribe(
        (res) => {
          // console.log('---------->', res)
          // console.log("orderid", this.orderId)
          this.router.navigate(['profile']);
          this.message = "Realizando pago... Regiriendo a Perfil de Usuario.";
          setTimeout(async () => {
            this.message = this.message + '.';
            }, 1500);
          // for (let i = 1; i <= 5; i++) {
          //   time = time + 500;
          //   setTimeout(async () => {
          //     this.message = this.message + '.';
          //     }, time);
          // }
          
        },
        err => {
          console.log(err)
        }
      )



  }
}
