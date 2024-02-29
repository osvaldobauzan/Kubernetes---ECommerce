import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    ShopService
  ],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent implements OnInit {

  orders:any = [];

  constructor (
    private shopService: ShopService
  ) {

  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {

    this.shopService.getOrdersByUser()
        .subscribe(
          res => {
            this.orders = res;
          },
          err => {
            console.log("Orders history - OnInit ", err);
          }
        );


  }

}
