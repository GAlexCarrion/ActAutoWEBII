// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Productos } from './pages/productos/productos';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: Nosotros }, 
    { path: 'productos', component: Productos }, 
    { path: '**', redirectTo: '/home' }
];
