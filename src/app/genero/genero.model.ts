import { Pelicula } from "../pelicula/pelicula.model";

export interface Genero {
    id: string;
    type: string;
    movies: Array<Pelicula>;
}