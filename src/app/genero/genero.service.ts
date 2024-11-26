import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from './genero.model';
import { CrearGeneroRequest } from './crear-genero/crear-genero.request-model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  constructor(private http: HttpClient) { }

  listarGeneros(): Observable<Array<Genero>> {
    return this.http.get<Array<Genero>>('genres');
  }

  buscarGeneroPorId(id: string): Observable<Genero> {
    return this.http.get<Genero>(`genres/${id}`);
  }

  crear(crearGeneroRequest: CrearGeneroRequest): Observable<Genero> {
    return this.http.post<Genero>('genres', crearGeneroRequest);
  }
}
