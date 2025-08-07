import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../../components/carrusel/carrusel'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarruselComponent], 
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class HomeComponent {
  welcomeMessage: string = 'Donde cada surco cuenta una historia y cada nota resuena con el alma del rock. Sumérgete en la leyenda.';
}