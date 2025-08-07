import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './carrusel.html',
  styleUrls: ['./carrusel.css']
})
export class CarruselComponent {
  imagenes: string[] = [
    'assets/carousel-images/acdc.jpg',
    'assets/carousel-images/darkside.jpg',
    'assets/carousel-images/nirvana.jpg',
    'assets/carousel-images/queen.jpg',
    'assets/carousel-images/zeppelin.jpg'
  ];

  imagen=0;

  siguiente(){
    this.imagen = (this.imagen + 1) % this.imagenes.length;
  }

 anterior(){
    this.imagen = (this.imagen - 1 + this.imagenes.length) % this.imagenes.length;
  }

}
