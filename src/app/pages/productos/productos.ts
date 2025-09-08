import { Component, OnInit } from '@angular/core';
import { ProductService, Disco } from '../../services/product'; // Asegúrate de que la ruta sea correcta.
import { CartService } from '../../services/cart'; // Importa el nuevo servicio del carrito
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router'; // Se importa RouterLink

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink // Se añade RouterLink a los imports
  ],
  templateUrl: '../productos/productos.html',
  styleUrl: '../productos/productos.css',
  providers: [ProductService]
})
export class ProductosComponent implements OnInit {
  discos: Disco[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getDiscos().subscribe(data => {
      this.discos = data;
      console.log('Datos de discos recibidos:', this.discos);
    });
  }

  addtocart(disco: any) {
    this.cartService.addtoCart(disco);
    alert('¡Disco agregado al carrito!');
  }
}

