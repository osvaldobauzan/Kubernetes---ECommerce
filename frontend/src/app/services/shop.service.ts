import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private URL = 'http://35.208.97.0:32703'
  // private URL = 'http://localhost:8003'
  
  token:any ="";
  headers:any;

  constructor(private http: HttpClient) { 

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

  // Orders
      // router.get('/cart', orderController.getCart);
      // router.get('/orders-status', orderController.getOrderByStatus);
      // router.post('/createCart', orderController.createCart);
      // router.put('/changeOrderStatus', orderController.changeOrderStatus);
      
  getCart(){
    return this.http.get<any>(this.URL + `/cart`, { headers: this.headers });
  }
  createCart(order:any){
    return this.http.post<any>(this.URL + `/createCart`, order, { headers: this.headers });
  }

  updateOrder(order:any){
    // console.log("----------> orderid", order)
    return this.http.put<any>(this.URL + `/updateOrder`, order, { headers: this.headers } );
  }

  getOrdersByUser () {
    return this.http.get<any>(this.URL + `/getOrdersByUser`, { headers: this.headers })
  }

  getOrderById(orderId:any) {
    return this.http.get<any>(this.URL + `/getOrderById/${orderId}`, { headers: this.headers })
  }

  updateOrderPayment(orderId:any){
    // console.log("SHOP SErvice", orderId)
    return this.http.put<any>(this.URL + `/update/payment/`, orderId,{ headers: this.headers })
  }
  
  // Items
      // router.post('/addItem', itemController.addItemToCart);
      // router.post('/cleanItemsToCart', itemController.cleanItemsToCart)
      // router.get('/getItem/:id', itemController.getItem);
      // router.get('/getItemsByOrder', itemController.getItemsByOrder);
      // router.delete('/deleteItem/:id', itemController.deleteItem)
  addItem(item:any){
    // console.log("shop service", item)
    return this.http.post<any>(this.URL + `/addItem`, item, { headers : this.headers });
  }
  getItemsByOrder(orderId:any){
    return this.http.get<any>(this.URL + `/getItemsByOrder/${orderId}`, { headers : this.headers })
  }

  deleteItem(itemId:any){
    // console.log("ShopService - itemid", itemId)
    return this.http.delete(this.URL + `/deleteItem/${itemId}`, { headers : this.headers });
  }

  // Shipping

  // Payments
      // router.get('/getPaymentByUser', paymentController.getPaymentsByUser);
      // router.get('/getPaymentByOrder', paymentController.getPaymentsByOrder);
      // router.get('/getPaymentById/:id', paymentController.getPaymentsById);
      // router.post('/createPayment', paymentController.createPayment);
      // router.put('/updatePayment/:id', paymentController.updatePayment);
}
