// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable } from 'rxjs';

// Define la interfaz para un usuario, incluyendo un 'id' opcional
export interface User {
  id?: number; // json-server añade un 'id' automáticamente
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL base de tu json-server para la colección 'usuarios'
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los usuarios de la base de datos simulada.
   * @returns Un Observable que emite un array de usuarios.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Registra un nuevo usuario en la base de datos simulada.
   * @param user El objeto User a registrar.
   * @returns Un Observable que emite el usuario creado.
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Puedes añadir más métodos aquí si necesitas actualizar o eliminar usuarios en el futuro
  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  // }

  // deleteUser(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
