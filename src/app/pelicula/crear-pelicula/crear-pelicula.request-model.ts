import { Director } from "../../director/director.model";
import { Genero } from "../../genero/genero.model";
import { Trailer } from "../trailer.model";

export interface CrearPeliculaRequest {
    title: string;
    poster: string;
    duration: number;
    country: string;
    releaseDate: Date;
    popularity: number;
    genre: Genero;
    director: Director;
    youtubeTrailer?: Trailer
}