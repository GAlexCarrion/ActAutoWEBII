import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { ProductosComponent } from './pages/productos/productos';
import { RegistroComponent } from './pages/registro/registro';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion';
import { CartPage } from './pages/cart/cart';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: Nosotros }, 
    { path: 'productos', component: ProductosComponent }, 
    { path: 'registro', component: RegistroComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'cart', component: CartPage }, 
    { path: '**', redirectTo: '/home' }
];

export const appConfig = {
    providers: [
        provideHttpClient()
    ]
};
