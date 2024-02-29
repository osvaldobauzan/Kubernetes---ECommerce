import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    ShopService,
  ],
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css'
})
export class OrdersDetailComponent implements OnInit{

  orderId:any = "";
  order:any = {};
  items:any = [];

  constructor (
    private shopService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.orderId = params['orderId'];
      }
    )
    
    this.getOrder(this.orderId);
    this.getOrderItems(this.orderId);

  }

  getOrder(orderId:any){

    this.shopService.getOrderById(orderId)
          .subscribe(
            res => {
              this.order = res;
              this.order.id = orderId;
            },
            err => {
              console.log(err);
            }
          );
  }

  getOrderItems (orderId:any) {
    this.shopService.getItemsByOrder(orderId)
          .subscribe(
            res => {
              // console.log(res)
              this.items = res;
            },
            err => {
              console.log(err);
            }
          );
  }
}
