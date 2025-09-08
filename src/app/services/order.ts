import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/pedidos'; // URL de la API de pedidos

  constructor(private http: HttpClient) { }

  /**
   * Envía una solicitud POST para crear un nuevo pedido.
   * @param orderData Los datos del pedido a guardar.
   * @returns Un Observable con la respuesta del servidor.
   */
  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }
}
