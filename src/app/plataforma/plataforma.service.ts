import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plataforma } from './plataforma.model';
import { CrearPlataformaRequest } from './crear-plataforma/crear-plataforma.request-model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(private http: HttpClient) { }

  listarPlataformas(): Observable<Array<Plataforma>> {
    return this.http.get<Array<Plataforma>>('platforms');
  }

  buscarPlataformaPorId(id:string): Observable<Plataforma> {
    return this.http.get<Plataforma>(`platforms/${id}`);
  }

  crear(crearPlataformaRequest: CrearPlataformaRequest): Observable<Plataforma> {
    return this.http.post<Plataforma>('platforms', crearPlataformaRequest);
  }
}
