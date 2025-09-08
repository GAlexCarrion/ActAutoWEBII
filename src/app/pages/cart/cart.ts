import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart'; // CORRECCIÓN: Ruta de importación completa
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice(); // Recalcula el total
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    // No es necesario llamar a getTotalPrice aquí si el servicio ya actualiza el observable
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

  comprarAhora() {
    const usuarioId = this.authService.getCurrentUserId();
    // Esta validación es crucial. Si ves NaN, significa que no hay un usuario logueado.
    if (!usuarioId) {
      alert('Por favor, inicie sesión para comprar.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.products.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    this.isProcessing = true;

    const pedido = {
      usuario_id: usuarioId,
      total: this.grandTotal,
      // CORRECCIÓN: El backend espera 'discos', no 'items'.
      discos: this.products.map(item => ({
        disco_id: item.id,
        cantidad: 1,
        precio_unitario: item.precio
      }))
    };

    console.log('Enviando pedido al backend:', pedido);

    this.cartService.crearPedido(pedido).subscribe({
      next: (response) => {
        alert('¡Compra realizada con éxito!');
        this.emptycart();
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        // Mostramos el error que viene del backend para tener más detalles
        alert(`Error al procesar la compra: ${err.error?.error || 'Error desconocido'}`);
        this.isProcessing = false;
      },
      complete: () => {
        this.isProcessing = false;
      }
    });
  }
}
  
