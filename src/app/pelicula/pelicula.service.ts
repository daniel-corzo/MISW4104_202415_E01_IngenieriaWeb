import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from './pelicula.model';
import { CrearReviewRequest } from './detalle-pelicula/crear-review.request-model';
import { CrearPeliculaRequest } from './crear-pelicula/crear-pelicula.request-model';
import { CrearTrailerRequest } from './crear-pelicula/crear-trailer.request-model';
import { Trailer } from './trailer.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }

  listarPeliculas(): Observable<Array<Pelicula>> {
    return this.http.get<Array<Pelicula>>('movies');
  }

  detallePelicula(movieId: string): Observable<Pelicula> {
    return this.http.get<Pelicula>(`movies/${movieId}`);
  }

  crearPelicula(crearPeliculaRequest: CrearPeliculaRequest): Observable<Pelicula> {
    return this.http.post<Pelicula>('movies', crearPeliculaRequest);
  }

  crearReview(movieId: string, review: CrearReviewRequest): Observable<Pelicula> {
    return this.http.post<Pelicula>(`movies/${movieId}/reviews`, review);
  }

  crearTrailer(crearTrailerRequest: CrearTrailerRequest): Observable<Trailer> {
    return this.http.post<Trailer>('youtube-trailers', crearTrailerRequest);
  }

}
