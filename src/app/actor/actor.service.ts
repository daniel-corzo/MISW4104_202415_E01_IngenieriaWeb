import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from './actor.model';
import { CrearActorRequest } from './crear-actor/crear-actor.request-model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  listarActores(): Observable<Array<Actor>> {
    return this.http.get<Array<Actor>>('actors');
  }

  detalleActor(actorId: string): Observable<Actor> {
    return this.http.get<Actor>(`actors/${actorId}`);
  }
  
  crear(crearActorRequest: CrearActorRequest): Observable<Actor> {
    return this.http.post<Actor>('actors', crearActorRequest);
  }
  
}
