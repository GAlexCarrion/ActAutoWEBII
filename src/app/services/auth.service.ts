import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string, contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Asumiendo que el backend devuelve un objeto con el id del usuario y un token
        if (response && response.token && response.usuario) {
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  getCurrentUser(): any | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null; // Asumiendo que el objeto de usuario tiene una propiedad 'id'
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
