import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disco {
anio: any;
portada: any;
  id_disco: number;
  titulo: string;
  artista: string;
  genero: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/discos';

  constructor(private http: HttpClient) { }

  getDiscos(): Observable<Disco[]> {
    return this.http.get<Disco[]>(this.apiUrl);
  }
}