import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { OrderService } from '../../services/order'; // Importa el servicio de pedidos

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartPage implements OnInit {
  public products: any[] = [];
  public grandTotal: number = 0;
  public isProcessing = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService, // Inyecta el servicio de pedidos
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

  comprarAhora() {
    // Obtiene el objeto de usuario completo del servicio de autenticación
    const currentUser = this.authService.currentUserValue;

    if (!currentUser || !currentUser.id_usuario) {
      alert('Error al obtener el usuario. Por favor, inicie sesión de nuevo.');
      this.router.navigate(['/iniciar-sesion']);
      return;
    }

    if (this.products.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    this.isProcessing = true;

    const pedido = {
      usuario_id: currentUser.id_usuario,
      total: this.grandTotal,
      items: this.products.map(item => ({
        disco_id: item.id_disco,
        cantidad: 1,
        precio_unitario: item.precio
      }))
    };

    console.log('Enviando pedido al backend:', pedido);

    this.orderService.createOrder(pedido).subscribe({
      next: (response) => {
        alert('¡Compra realizada con éxito!');
        this.emptycart();
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        alert(`Error al procesar la compra: ${err.error?.error || 'Error desconocido'}`);
        this.isProcessing = false;
      },
      complete: () => {
        this.isProcessing = false;
      }
    });
  }
}
