import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from './director.model';
import { CrearDirectorRequest } from './crear-director/crear-director.request-model';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(private http: HttpClient) { }

  listarDirectores(): Observable<Array<Director>> {
    return this.http.get<Array<Director>>('directors');
  }

  buscarDirectorPorId(id:string): Observable<Director> {
    return this.http.get<Director>(`directors/${id}`);
  }

  crear(crearDirectorRequest: CrearDirectorRequest): Observable<Director> {
    return this.http.post<Director>('directors', crearDirectorRequest);
  }
}
