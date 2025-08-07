// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Productos } from './pages/productos/productos';
import { RegistroComponent } from './pages/registro/registro';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: Nosotros }, 
    { path: 'productos', component: Productos }, 
    { path: 'registro', component: RegistroComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent }, 


    
    { path: '**', redirectTo: '/home' }
];
