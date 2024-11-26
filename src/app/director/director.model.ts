import { Pelicula } from "../pelicula/pelicula.model";

export interface Director {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: Date;
    biography: string;
    movies: Array<Pelicula>
}