import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  register(arg0: { nombre_completo: any; email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) { }

  /**
   * Envía una solicitud POST para registrar a un nuevo usuario.
   * @param userData Los datos del usuario a registrar.
   * @returns Un Observable con la respuesta del servidor.
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, userData);
  }

  /**
   * Envía una solicitud POST para autenticar a un usuario.
   * @param credentials Las credenciales del usuario (email y contraseña).
   * @returns Un Observable con la respuesta del servidor.
   */
  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
