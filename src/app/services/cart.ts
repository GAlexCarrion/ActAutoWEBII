import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>(this.cartItemList);

  // Este servicio NO necesita una URL de API, su propósito es local.

  constructor() { }

  getProducts(): Observable<any[]> {
    return this.productList.asObservable();
  }

  addtoCart(product: any) {
    const itemExists = this.cartItemList.find(item => item.id === product.id);
    if (!itemExists) {
      this.cartItemList.push(product);
      this.productList.next([...this.cartItemList]);
    }
  }

  getTotalPrice(): number {
    return this.cartItemList.reduce((total, product) => total + Number(product.precio), 0);
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== product.id);
    this.productList.next([...this.cartItemList]);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
