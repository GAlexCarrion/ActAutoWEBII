
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import {  NavBarComponent } from './components/nav-bar/nav-bar'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet,  NavBarComponent], 
  templateUrl: './app.html', 
  styleUrls: ['./app.css']     
})
export class App {
  title = 'ActividadAutonoma - Discos de Rock'; 
}
