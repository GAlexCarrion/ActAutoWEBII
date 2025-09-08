import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// Define la interfaz para el objeto de usuario que viene del backend
interface BackendLoginResponse {
  message: string;
  usuario: {
    id_usuario: number;
    nombre: string;
    email: string;
  };
}

// Define la interfaz para el objeto de usuario que usarás en el frontend
export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUserId() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    // Intenta cargar el usuario desde localStorage al iniciar el servicio
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Método para obtener el valor actual del usuario
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Método para el inicio de sesión
  login(credentials: { email: string, password: string }): Observable<BackendLoginResponse> {
    return this.http.post<BackendLoginResponse>(`${this.apiUrl}/usuarios/login`, credentials).pipe(
      // Usa 'tap' para realizar acciones secundarias sin modificar el stream
      tap(response => {
        // Asegúrate de que la respuesta tenga la propiedad 'usuario'
        if (response && response.usuario) {
          // Almacena el usuario completo en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          // Actualiza el BehaviorSubject para notificar a los demás componentes
          this.currentUserSubject.next(response.usuario);
        }
      })
    );
  }

  // Método para cerrar la sesión
  logout(): void {
    // Elimina al usuario de localStorage
    localStorage.removeItem('currentUser');
    // Actualiza el BehaviorSubject a null
    this.currentUserSubject.next(null);
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    // Comprueba si el usuario existe en el BehaviorSubject
    return !!this.currentUserSubject.value;
  }
}
