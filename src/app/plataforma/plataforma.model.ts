import { Pelicula } from "../pelicula/pelicula.model";

export interface Plataforma {
    id: string;
    name: string;
    url: string;
    movies: Array<Pelicula>;
}