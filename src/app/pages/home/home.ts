import { Component } from '@angular/core';
import { CarruselComponent } from '../carrusel/carrusel'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarruselComponent], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  welcomeMessage: string = 'Explora nuestra vasta colección de joyas del rock.';
}