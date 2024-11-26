import { Component, Input } from '@angular/core';
import { Pelicula } from '../../pelicula/pelicula.model';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.scss'
})
export class CardMovieComponent {
  @Input() pelicula!: Pelicula;
}
